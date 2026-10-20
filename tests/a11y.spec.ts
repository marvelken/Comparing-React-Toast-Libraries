import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import * as fs from 'fs'
import * as path from 'path'

const BASE = 'http://localhost:5173'
function url(lib: string, snippet: string) {
  return `${BASE}/?lib=${lib}&snippet=${snippet}`
}

const resultsDir = path.join(import.meta.dirname, '..', 'results')

const libraries = [
  { name: 'react-hot-toast', snippet: 'Basic', btn: 'btn-basic', errorBtn: 'btn-basic' },
  { name: 'sonner', snippet: 'Variants', btn: 'btn-success', errorBtn: 'btn-error' },
  { name: 'react-toastify', snippet: 'Variants', btn: 'btn-success', errorBtn: 'btn-error' },
  { name: 'notistack', snippet: 'Variants', btn: 'variant-success', errorBtn: 'variant-error' },
  { name: 'base-ui', snippet: 'Minimal', btn: 'add-toast', errorBtn: 'add-toast' },
]

const allA11y: Record<string, unknown>[] = []
const allAxe: Record<string, unknown>[] = []

for (const lib of libraries) {
  test(`a11y attributes + axe: ${lib.name}`, async ({ page }) => {
    await page.goto(url(lib.name, lib.snippet))
    await page.click(`[data-testid="${lib.btn}"]`)
    await page.waitForTimeout(1500)
    await page.click(`[data-testid="${lib.errorBtn}"]`)
    await page.waitForTimeout(1500)

    // Scrape a11y attributes from any live region or toast-like element
    const attrs = await page.evaluate(() => {
      const candidates = document.querySelectorAll(
        '[role="status"], [role="alert"], [role="log"], [aria-live], ' +
        '[data-sonner-toast], .Toastify__toast, .notistack-MuiContent, ' +
        '[data-sonner-toaster], .Toastify, .notistack-SnackbarContainer, ' +
        'output, [data-toast]'
      )

      const results: {
        tagName: string
        role: string | null
        ariaLive: string | null
        ariaAtomic: string | null
        ariaLabel: string | null
        outerHTML: string
      }[] = []

      candidates.forEach(el => {
        results.push({
          tagName: el.tagName,
          role: el.getAttribute('role'),
          ariaLive: el.getAttribute('aria-live'),
          ariaAtomic: el.getAttribute('aria-atomic'),
          ariaLabel: el.getAttribute('aria-label'),
          outerHTML: el.outerHTML.slice(0, 400),
        })
      })
      return results
    }).catch(() => [{ tagName: 'ERROR', role: null, ariaLive: null, ariaAtomic: null, ariaLabel: null, outerHTML: 'evaluate failed' }])

    allA11y.push({ library: lib.name, elements: attrs })

    // Run axe with timeout — react-hot-toast causes axe to hang (goober styles)
    const axeTimeout = lib.name === 'react-hot-toast' ? 10_000 : 30_000
    try {
      const axeReport = await Promise.race([
        new AxeBuilder({ page }).analyze(),
        new Promise<never>((_, reject) => setTimeout(() => reject(new Error('axe timeout')), axeTimeout)),
      ])
      allAxe.push({
        library: lib.name,
        violationCount: axeReport.violations.length,
        violations: axeReport.violations.map(v => ({
          id: v.id,
          impact: v.impact,
          nodes: v.nodes.length,
        })),
      })
    } catch (e) {
      allAxe.push({
        library: lib.name,
        violationCount: -1,
        error: (e as Error).message,
      })
    }
  })

  test(`keyboard: ${lib.name}`, async ({ page }) => {
    await page.goto(url(lib.name, lib.snippet))
    await page.click(`[data-testid="${lib.btn}"]`)
    await page.waitForTimeout(1500)

    let focusReached = false
    let closeReachable = false
    let method = 'Tab'

    if (lib.name === 'sonner') {
      method = 'Alt+T'
      await page.keyboard.press('Alt+KeyT')
      await page.waitForTimeout(500)
      focusReached = await page.evaluate(() => {
        const ae = document.activeElement
        return !!(ae?.closest('[data-sonner-toaster]') || ae?.closest('[data-sonner-toast]'))
      })
      for (let i = 0; i < 5 && !closeReachable; i++) {
        await page.keyboard.press('Tab')
        closeReachable = await page.evaluate(() =>
          document.activeElement?.tagName === 'BUTTON' &&
          !!(document.activeElement?.closest('[data-sonner-toast]') || document.activeElement?.closest('[data-sonner-toaster]'))
        )
      }
    } else if (lib.name === 'base-ui') {
      method = 'F6'
      await page.keyboard.press('F6')
      await page.waitForTimeout(500)
      focusReached = await page.evaluate(() => {
        const ae = document.activeElement
        // Check if we're in the toast viewport area
        return !!(ae?.closest('ol') || ae?.closest('output') || ae?.tagName === 'LI' || ae?.closest('[role="region"]'))
      })
      for (let i = 0; i < 5 && !closeReachable; i++) {
        await page.keyboard.press('Tab')
        closeReachable = await page.evaluate(() => document.activeElement?.tagName === 'BUTTON')
      }
    } else {
      // Tab-only for react-hot-toast, react-toastify, notistack
      try {
        for (let i = 0; i < 20 && !focusReached; i++) {
          await page.keyboard.press('Tab')
          await page.waitForTimeout(100)
          focusReached = await page.evaluate(() => {
            const ae = document.activeElement
            if (!ae) return false
            return !!(
              ae.closest('[role="status"]') || ae.closest('[role="alert"]') ||
              ae.closest('.Toastify__toast') || ae.closest('.notistack-SnackbarContainer') ||
              ae.closest('.notistack-MuiContent') ||
              ae.getAttribute('role') === 'button'
            )
          })
          if (focusReached) {
            closeReachable = await page.evaluate(() =>
              document.activeElement?.tagName === 'BUTTON' ||
              document.activeElement?.getAttribute('role') === 'button'
            )
          }
        }
      } catch { /* navigation or context destroy during tab — mark as not reachable */ }
    }

    allA11y.push({
      library: lib.name,
      keyboard: { method, focusReached, closeReachable },
    })
  })

  test(`reduced motion: ${lib.name}`, async ({ page, context }) => {
    // Emulate reduced motion via CDP
    const cdp = await page.context().newCDPSession(page)
    await cdp.send('Emulation.setEmulatedMedia', {
      features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
    })

    await page.goto(url(lib.name, lib.snippet))
    await page.click(`[data-testid="${lib.btn}"]`)
    await page.waitForTimeout(1500)

    const motionData = await page.evaluate(() => {
      const all = document.querySelectorAll(
        '[role="status"], [role="alert"], [data-sonner-toast], ' +
        '.Toastify__toast, .notistack-MuiContent, output, li'
      )
      let animDur = 'none found'
      let transDur = 'none found'
      for (const el of all) {
        const cs = getComputedStyle(el)
        if (cs.animationDuration && cs.animationDuration !== '0s') animDur = cs.animationDuration
        if (cs.transitionDuration && cs.transitionDuration !== '0s') transDur = cs.transitionDuration
      }
      return { animDur, transDur, matchesQuery: window.matchMedia('(prefers-reduced-motion: reduce)').matches }
    })

    allA11y.push({
      library: lib.name,
      reducedMotion: motionData,
    })
  })
}

test.afterAll(() => {
  fs.writeFileSync(path.join(resultsDir, 'a11y-attributes.json'), JSON.stringify(allA11y, null, 2))
  fs.writeFileSync(path.join(resultsDir, 'a11y-axe.json'), JSON.stringify(allAxe, null, 2))
})
