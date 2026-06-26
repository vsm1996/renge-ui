import { render } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import Select from '../Select.svelte'
import { describe, it, expect } from 'vitest'

describe('Select', () => {
  it('renders select element', () => {
    const { getByRole } = render(Select)
    const select = getByRole('combobox')
    expect(select).toBeTruthy()
  })

  it('binds value', async () => {
    const user = userEvent.setup()
    const { getByRole } = render(Select, {
      slots: {
        default: '<option value="a">Option A</option><option value="b">Option B</option>',
      },
    })
    const select = getByRole('combobox')

    await user.selectOptions(select, 'a')
    expect(select).toHaveValue('a')
  })

  it('applies size styles', () => {
    const { getByRole } = render(Select, { props: { size: 'lg' } })
    const select = getByRole('combobox')
    const styles = window.getComputedStyle(select)
    expect(styles.padding).toBeTruthy()
  })

  it('applies state styles', () => {
    const { getByRole } = render(Select, { props: { state: 'success' } })
    const select = getByRole('combobox')
    expect(select.style.borderColor).toContain('success')
  })

  it('supports placeholder option', () => {
    const { getByRole } = render(Select, {
      props: { placeholder: 'Choose one' },
      slots: {
        default: '<option value="">Choose one</option><option value="a">Option A</option>',
      },
    })
    const select = getByRole('combobox')
    expect(select).toBeTruthy()
  })

  it('supports disabled state', () => {
    const { getByRole } = render(Select, { props: { disabled: true } })
    const select = getByRole('combobox')
    expect(select).toBeDisabled()
  })

  it('supports fullWidth', () => {
    const { getByRole } = render(Select, { props: { fullWidth: true } })
    const select = getByRole('combobox')
    const styles = window.getComputedStyle(select)
    expect(styles.width).toBe('100%')
  })
})
