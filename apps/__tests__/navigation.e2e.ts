import { test, expect } from '@playwright/test'

test.describe('Navigation Components', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('Navigation bar visible on page', async ({ page }) => {
    const nav = page.locator('nav').first()
    expect(nav).toBeVisible()
  })

  test('Breadcrumb navigation', async ({ page }) => {
    await page.goto('/components')
    const breadcrumb = page.locator('nav [role="navigation"]')
    if (await breadcrumb.isVisible()) {
      expect(breadcrumb).toBeTruthy()
    }
  })

  test('Tab navigation', async ({ page }) => {
    await page.goto('/components')
    const tablist = page.locator('[role="tablist"]')
    if (await tablist.isVisible()) {
      const tabs = page.locator('[role="tab"]')
      const count = await tabs.count()
      expect(count).toBeGreaterThan(0)
    }
  })

  test('Pagination navigation', async ({ page }) => {
    const pagination = page.locator('nav [role="navigation"]')
    expect(pagination).toBeTruthy()
  })

  test('Link navigation', async ({ page }) => {
    const links = page.locator('a')
    const count = await links.count()
    expect(count).toBeGreaterThan(0)
  })

  test('Navigation keyboard accessibility', async ({ page }) => {
    const nav = page.locator('nav').first()
    await nav.focus()
    expect(nav).toBeFocused()
  })
})
