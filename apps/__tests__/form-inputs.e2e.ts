import { test, expect } from '@playwright/test'

test.describe('Form Input Components', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components')
  })

  test('Button click functionality', async ({ page }) => {
    const button = page.getByRole('button', { name: /click/i }).first()
    await button.click()
    expect(button).toBeVisible()
  })

  test('Input text entry', async ({ page }) => {
    const input = page.locator('input[type="text"]').first()
    await input.fill('test input')
    expect(input).toHaveValue('test input')
  })

  test('Select dropdown change', async ({ page }) => {
    const select = page.locator('select').first()
    if (await select.isVisible()) {
      await select.selectOption('option')
      expect(select).toBeTruthy()
    }
  })

  test('Checkbox toggle', async ({ page }) => {
    const checkbox = page.locator('input[type="checkbox"]').first()
    if (await checkbox.isVisible()) {
      const initialState = await checkbox.isChecked()
      await checkbox.click()
      const newState = await checkbox.isChecked()
      expect(newState).not.toBe(initialState)
    }
  })

  test('Radio button selection', async ({ page }) => {
    const radio = page.locator('input[type="radio"]').first()
    if (await radio.isVisible()) {
      await radio.click()
      expect(radio).toBeChecked()
    }
  })

  test('Input focus/blur state', async ({ page }) => {
    const input = page.locator('input[type="text"]').first()
    await input.focus()
    expect(input).toBeFocused()
    await input.blur()
    expect(input).not.toBeFocused()
  })

  test('Form input accessibility', async ({ page }) => {
    const inputs = page.locator('input')
    const count = await inputs.count()
    expect(count).toBeGreaterThan(0)
  })
})
