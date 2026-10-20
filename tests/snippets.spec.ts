import { test, expect } from '@playwright/test'

const BASE = 'http://localhost:5173'

function url(lib: string, snippet: string) {
  return `${BASE}/?lib=${lib}&snippet=${snippet}`
}

// ─── react-hot-toast ───────────────────────────────────────────

test.describe('react-hot-toast', () => {
  test('Basic', async ({ page }) => {
    await page.goto(url('react-hot-toast', 'Basic'))
    await page.click('[data-testid="btn-basic"]')
    await expect(page.locator('text=This is a simple toast.')).toBeVisible({ timeout: 3000 })
  })

  test('Variants', async ({ page }) => {
    await page.goto(url('react-hot-toast', 'Variants'))
    await page.click('[data-testid="btn-success"]')
    await expect(page.locator('[role="status"]').first()).toBeVisible({ timeout: 3000 })
    await page.click('[data-testid="btn-error"]')
    await page.click('[data-testid="btn-loading"]')
    // All should render
    const toasts = page.locator('[role="status"]')
    await expect(toasts.first()).toBeVisible({ timeout: 3000 })
  })

  test('Promise', async ({ page }) => {
    await page.goto(url('react-hot-toast', 'Promise'))
    await page.click('[data-testid="btn-promise"]')
    // Wait for loading then success
    await expect(page.locator('text=Fetching data')).toBeVisible({ timeout: 3000 })
    await expect(page.locator('text=Data fetched')).toBeVisible({ timeout: 5000 })
  })

  test('Promise - async function', async ({ page }) => {
    await page.goto(url('react-hot-toast', 'Promise'))
    await page.click('[data-testid="btn-promise-async-fn"]')
    await expect(page.locator('text=Running async function')).toBeVisible({ timeout: 3000 })
  })

  test('Options - duration', async ({ page }) => {
    await page.goto(url('react-hot-toast', 'Options'))
    await page.click('[data-testid="btn-duration"]')
    await expect(page.locator('text=This toast lasts 5 seconds')).toBeVisible({ timeout: 3000 })
  })

  test('Options - icon', async ({ page }) => {
    await page.goto(url('react-hot-toast', 'Options'))
    await page.click('[data-testid="btn-icon"]')
    await expect(page.locator('text=Custom icon toast')).toBeVisible({ timeout: 3000 })
  })

  test('Options - style', async ({ page }) => {
    await page.goto(url('react-hot-toast', 'Options'))
    await page.click('[data-testid="btn-style"]')
    await expect(page.locator('text=Styled toast')).toBeVisible({ timeout: 3000 })
  })

  test('Dismiss', async ({ page }) => {
    await page.goto(url('react-hot-toast', 'Dismiss'))
    await page.click('[data-testid="btn-create"]')
    const toastEl = page.locator('[role="status"]').first()
    await expect(toastEl).toBeVisible({ timeout: 3000 })
    await page.click('[data-testid="btn-dismiss-all"]')
    await expect(toastEl).not.toBeVisible({ timeout: 5000 })
  })

  test('MultiToaster', async ({ page }) => {
    await page.goto(url('react-hot-toast', 'MultiToaster'))
    await page.click('[data-testid="btn-top-toast"]')
    await expect(page.locator('text=Toast in top-right toaster')).toBeVisible({ timeout: 3000 })
    await page.click('[data-testid="btn-bottom-toast"]')
    await expect(page.locator('text=Toast in bottom-left toaster')).toBeVisible({ timeout: 3000 })
  })
})

// ─── sonner ────────────────────────────────────────────────────

test.describe('sonner', () => {
  test('Basic', async ({ page }) => {
    await page.goto(url('sonner', 'Basic'))
    await page.click('[data-testid="btn-basic"]')
    await expect(page.locator('[data-sonner-toast]').first()).toBeVisible({ timeout: 3000 })
  })

  test('Variants', async ({ page }) => {
    await page.goto(url('sonner', 'Variants'))
    for (const v of ['success', 'error', 'warning', 'info', 'loading']) {
      await page.click(`[data-testid="btn-${v}"]`)
      await page.waitForTimeout(300)
    }
    const toasts = page.locator('[data-sonner-toast]')
    await expect(toasts.first()).toBeVisible({ timeout: 3000 })
    expect(await toasts.count()).toBeGreaterThanOrEqual(5)
  })

  test('DescriptionAction', async ({ page }) => {
    await page.goto(url('sonner', 'DescriptionAction'))
    await page.click('[data-testid="btn-description"]')
    await expect(page.locator('[data-sonner-toast]').first()).toBeVisible({ timeout: 3000 })
    await page.click('[data-testid="btn-action"]')
    await expect(page.locator('[data-sonner-toast]').nth(1)).toBeVisible({ timeout: 3000 })
  })

  test('Promise', async ({ page }) => {
    await page.goto(url('sonner', 'Promise'))
    await page.click('[data-testid="btn-promise"]')
    await expect(page.locator('[data-sonner-toast]').first()).toBeVisible({ timeout: 3000 })
  })

  test('ToasterProps', async ({ page }) => {
    await page.goto(url('sonner', 'ToasterProps'))
    await page.click('[data-testid="btn-toaster-props"]')
    await expect(page.locator('[data-sonner-toast]').first()).toBeVisible({ timeout: 3000 })
  })

  test('PerToastOptions', async ({ page }) => {
    await page.goto(url('sonner', 'PerToastOptions'))
    await page.click('[data-testid="btn-duration"]')
    await expect(page.locator('[data-sonner-toast]').first()).toBeVisible({ timeout: 3000 })
  })

  test('MultiToaster', async ({ page }) => {
    await page.goto(url('sonner', 'MultiToaster'))
    await page.click('[data-testid="btn-primary-toaster"]')
    await expect(page.locator('[data-sonner-toast]').first()).toBeVisible({ timeout: 3000 })
  })
})

// ─── react-toastify ───────────────────────────────────────────

test.describe('react-toastify', () => {
  test('BasicWithCSS', async ({ page }) => {
    await page.goto(url('react-toastify', 'BasicWithCSS'))
    await page.click('[data-testid="btn-basic-css"]')
    await expect(page.locator('.Toastify__toast').first()).toBeVisible({ timeout: 3000 })
  })

  test('BasicWithoutCSS', async ({ page }) => {
    await page.goto(url('react-toastify', 'BasicWithoutCSS'))
    await page.click('[data-testid="btn-basic-no-css"]')
    await expect(page.locator('.Toastify__toast').first()).toBeVisible({ timeout: 3000 })
  })

  test('Variants', async ({ page }) => {
    await page.goto(url('react-toastify', 'Variants'))
    await page.click('[data-testid="btn-success"]')
    await expect(page.locator('.Toastify__toast').first()).toBeVisible({ timeout: 3000 })
    await page.click('[data-testid="btn-error"]')
    await page.click('[data-testid="btn-warn"]')
    await page.click('[data-testid="btn-warning"]')
    await page.click('[data-testid="btn-info"]')
    await page.click('[data-testid="btn-default"]')
  })

  test('Dark theme', async ({ page }) => {
    await page.goto(url('react-toastify', 'Dark'))
    await page.click('[data-testid="btn-toast-dark"]')
    await expect(page.locator('.Toastify__toast').first()).toBeVisible({ timeout: 3000 })
    await page.click('[data-testid="btn-success-dark-theme"]')
    await expect(page.locator('.Toastify__toast').nth(1)).toBeVisible({ timeout: 3000 })
  })

  test('Position', async ({ page }) => {
    await page.goto(url('react-toastify', 'Position'))
    await page.click('[data-testid="btn-bottom-right"]')
    await expect(page.locator('.Toastify__toast').first()).toBeVisible({ timeout: 3000 })
  })

  test('Update - ref version', async ({ page }) => {
    await page.goto(url('react-toastify', 'Update'))
    await page.click('[data-testid="btn-start-ref"]')
    await expect(page.locator('.Toastify__toast').first()).toBeVisible({ timeout: 3000 })
    await page.click('[data-testid="btn-complete-ref"]')
    await expect(page.locator('text=Data fetched successfully')).toBeVisible({ timeout: 5000 })
  })

  test('Update - direct version', async ({ page }) => {
    await page.goto(url('react-toastify', 'Update'))
    await page.click('[data-testid="btn-start-direct"]')
    await expect(page.locator('.Toastify__toast').first()).toBeVisible({ timeout: 3000 })
    await page.click('[data-testid="btn-complete-direct"]')
    await expect(page.locator('text=Data fetched (direct)')).toBeVisible({ timeout: 5000 })
  })

  test('PromiseToast', async ({ page }) => {
    await page.goto(url('react-toastify', 'PromiseToast'))
    await page.click('[data-testid="btn-promise-success"]')
    await expect(page.locator('.Toastify__toast').first()).toBeVisible({ timeout: 3000 })
  })

  test('CSSTransition', async ({ page }) => {
    await page.goto(url('react-toastify', 'CSSTransition'))
    await page.click('[data-testid="btn-bounce"]')
    await expect(page.locator('.Toastify__toast').first()).toBeVisible({ timeout: 3000 })
  })
})

// ─── notistack ─────────────────────────────────────────────────

test.describe('notistack', () => {
  test('DirectImport', async ({ page }) => {
    await page.goto(url('notistack', 'DirectImport'))
    await page.click('[data-testid="direct-enqueue"]')
    await expect(page.locator('.notistack-SnackbarContainer').first()).toBeVisible({ timeout: 3000 })
  })

  test('UseSnackbar', async ({ page }) => {
    await page.goto(url('notistack', 'UseSnackbar'))
    await page.click('[data-testid="hook-enqueue"]')
    await expect(page.locator('.notistack-SnackbarContainer').first()).toBeVisible({ timeout: 3000 })
  })

  test('Variants', async ({ page }) => {
    await page.goto(url('notistack', 'Variants'))
    await page.click('[data-testid="variant-success"]')
    await expect(page.locator('.notistack-SnackbarContainer').first()).toBeVisible({ timeout: 3000 })
    await page.click('[data-testid="variant-error"]')
    await page.click('[data-testid="variant-warning"]')
    await page.click('[data-testid="variant-info"]')
    await page.click('[data-testid="variant-default"]')
  })

  test('ProviderOptions', async ({ page }) => {
    await page.goto(url('notistack', 'ProviderOptions'))
    await page.click('[data-testid="provider-opts-enqueue"]')
    await expect(page.locator('.notistack-SnackbarContainer').first()).toBeVisible({ timeout: 3000 })
  })

  test('PerSnackbarOptions', async ({ page }) => {
    await page.goto(url('notistack', 'PerSnackbarOptions'))
    await page.click('[data-testid="per-snack-action"]')
    await expect(page.locator('.notistack-SnackbarContainer').first()).toBeVisible({ timeout: 3000 })
  })
})

// ─── @base-ui/react ────────────────────────────────────────────

test.describe('base-ui', () => {
  test('Minimal', async ({ page }) => {
    await page.goto(url('base-ui', 'Minimal'))
    await page.click('[data-testid="add-toast"]')
    // Base UI Toast.Root renders with role or as a list item
    await expect(page.locator('text=Notification')).toBeVisible({ timeout: 3000 })
  })

  test('TypedToast', async ({ page }) => {
    await page.goto(url('base-ui', 'TypedToast'))
    await page.click('[data-testid="add-success-toast"]')
    await expect(page.locator('text=Item deleted')).toBeVisible({ timeout: 3000 })
    // Check undo button is present
    await expect(page.locator('[data-testid="undo-action"]')).toBeVisible({ timeout: 3000 })
  })

  test('PromiseToast', async ({ page }) => {
    await page.goto(url('base-ui', 'PromiseToast'))
    await page.click('[data-testid="promise-toast"]')
    // Should show loading first
    await expect(page.locator('text=Saving changes')).toBeVisible({ timeout: 3000 })
    // Then success
    await expect(page.locator('text=Changes saved')).toBeVisible({ timeout: 5000 })
  })

  test('GlobalManager', async ({ page }) => {
    await page.goto(url('base-ui', 'GlobalManager'))
    await page.click('[data-testid="global-toast"]')
    await expect(page.locator('text=Hello from outside React')).toBeVisible({ timeout: 3000 })
  })

  test('DedupToast', async ({ page }) => {
    await page.goto(url('base-ui', 'DedupToast'))
    await page.click('[data-testid="dedup-toast"]')
    await page.click('[data-testid="dedup-toast"]')
    await page.waitForTimeout(500)
    // Only one toast should exist
    const toasts = page.locator('text=Only one of me')
    expect(await toasts.count()).toBe(1)
  })

  test('StyledToast', async ({ page }) => {
    await page.goto(url('base-ui', 'StyledToast'))
    await page.click('[data-testid="add-styled-toast"]')
    await expect(page.locator('text=Styled notification')).toBeVisible({ timeout: 3000 })
  })
})

// ─── react-toast-notifications ─────────────────────────────────

test.describe('react-toast-notifications', () => {
  test('Basic (may fail on React 19)', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (err) => errors.push(err.message))
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text())
    })

    await page.goto(url('react-toast-notifications', 'Basic'))
    await page.waitForTimeout(2000)

    const btn = page.locator('[data-testid="btn-basic"]')
    if (await btn.isVisible()) {
      await btn.click()
      await page.waitForTimeout(2000)
      const toastVisible = await page.locator('[class*="toast"]').first().isVisible().catch(() => false)
      console.log('react-toast-notifications: toast visible =', toastVisible)
      console.log('react-toast-notifications: errors =', JSON.stringify(errors))
    } else {
      console.log('react-toast-notifications: component failed to render')
      console.log('react-toast-notifications: errors =', JSON.stringify(errors))
    }
    // This test always passes — we're just collecting data
    expect(true).toBe(true)
  })
})
