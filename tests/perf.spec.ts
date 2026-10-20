import { test, expect } from '@playwright/test'
import * as fs from 'fs'
import * as path from 'path'

const BASE = 'http://localhost:5173'
function url(lib: string, snippet: string) {
  return `${BASE}/?lib=${lib}&snippet=${snippet}`
}

const resultsDir = path.join(import.meta.dirname, '..', 'results')

const libraries = [
  { name: 'react-hot-toast', snippet: 'Basic', btn: 'btn-basic' },
  { name: 'sonner', snippet: 'Basic', btn: 'btn-basic' },
  { name: 'react-toastify', snippet: 'BasicWithCSS', btn: 'btn-basic-css' },
  { name: 'notistack', snippet: 'DirectImport', btn: 'direct-enqueue' },
  { name: 'base-ui', snippet: 'Minimal', btn: 'add-toast' },
]

const TOAST_COUNT = 50
const RUNS = 5

interface PerfRun {
  library: string
  run: number
  longTaskCount: number
  longTaskTotalMs: number
  totalTimeMs: number
  visibleToastLimit: number
}

const allRuns: PerfRun[] = []

for (const lib of libraries) {
  for (let run = 0; run < RUNS; run++) {
    test(`perf: ${lib.name} run ${run + 1}`, async ({ page }) => {
      await page.goto(url(lib.name, lib.snippet))
      await page.waitForTimeout(1000)

      // Inject perf observer and fire 50 toasts via button clicks as fast as possible
      const result = await page.evaluate(async ({ btnTestId, toastCount }) => {
        // Set up PerformanceObserver for longtask entries
        const longTasks: { duration: number }[] = []
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'longtask') {
              longTasks.push({ duration: entry.duration })
            }
          }
        })
        try {
          observer.observe({ type: 'longtask', buffered: true })
        } catch {
          // longtask may not be available in all browsers
        }

        const btn = document.querySelector(`[data-testid="${btnTestId}"]`) as HTMLButtonElement
        if (!btn) return { longTaskCount: 0, longTaskTotalMs: 0, totalTimeMs: 0, visibleToastLimit: 0, error: 'button not found' }

        const start = performance.now()

        // Fire 50 toasts
        for (let i = 0; i < toastCount; i++) {
          btn.click()
        }

        // Wait until DOM stops changing for 500ms (using MutationObserver)
        await new Promise<void>((resolve) => {
          let timeout: ReturnType<typeof setTimeout>
          const mo = new MutationObserver(() => {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
              mo.disconnect()
              resolve()
            }, 500)
          })
          mo.observe(document.body, { childList: true, subtree: true })
          // Safety timeout
          timeout = setTimeout(() => {
            mo.disconnect()
            resolve()
          }, 500)
        })

        const totalTimeMs = performance.now() - start
        observer.disconnect()

        // Count visible toasts
        const visibleToasts = document.querySelectorAll(
          '[role="status"], [role="alert"], [data-sonner-toast], .Toastify__toast, .notistack-MuiContent, [role="dialog"]'
        )
        let visibleCount = 0
        visibleToasts.forEach(el => {
          const rect = (el as HTMLElement).getBoundingClientRect()
          if (rect.width > 0 && rect.height > 0) visibleCount++
        })

        return {
          longTaskCount: longTasks.length,
          longTaskTotalMs: longTasks.reduce((sum, t) => sum + t.duration, 0),
          totalTimeMs: Math.round(totalTimeMs * 100) / 100,
          visibleToastLimit: visibleCount,
        }
      }, { btnTestId: lib.btn, toastCount: TOAST_COUNT })

      allRuns.push({
        library: lib.name,
        run: run + 1,
        longTaskCount: result.longTaskCount,
        longTaskTotalMs: Math.round(result.longTaskTotalMs * 100) / 100,
        totalTimeMs: result.totalTimeMs,
        visibleToastLimit: result.visibleToastLimit,
      })

      // Basic assertion — it should complete
      expect(result.totalTimeMs).toBeGreaterThan(0)
    })
  }
}

test.afterAll(() => {
  fs.writeFileSync(
    path.join(resultsDir, 'perf.json'),
    JSON.stringify(allRuns, null, 2)
  )

  // Compute stats per library
  const stats: Record<string, {
    medianTotalMs: number
    minTotalMs: number
    maxTotalMs: number
    medianLongTaskCount: number
    medianLongTaskMs: number
    visibleLimit: number
  }> = {}

  const libNames = [...new Set(allRuns.map(r => r.library))]
  for (const name of libNames) {
    const runs = allRuns.filter(r => r.library === name)
    const totals = runs.map(r => r.totalTimeMs).sort((a, b) => a - b)
    const ltCounts = runs.map(r => r.longTaskCount).sort((a, b) => a - b)
    const ltMs = runs.map(r => r.longTaskTotalMs).sort((a, b) => a - b)
    const mid = Math.floor(totals.length / 2)
    stats[name] = {
      medianTotalMs: totals[mid],
      minTotalMs: totals[0],
      maxTotalMs: totals[totals.length - 1],
      medianLongTaskCount: ltCounts[mid],
      medianLongTaskMs: ltMs[mid],
      visibleLimit: runs[0].visibleToastLimit,
    }
  }

  fs.writeFileSync(
    path.join(resultsDir, 'perf-stats.json'),
    JSON.stringify(stats, null, 2)
  )
})
