import { render } from '@testing-library/svelte'
import Select from '../Select.svelte'
import { describe, it, expect } from 'vitest'

describe('Select', () => {
  it('renders select element', () => {
    const { getByRole } = render(Select)
    const select = getByRole('combobox')
    expect(select).toBeTruthy()
  })

  it('binds value', () => {
    const { getByRole } = render(Select, { props: { value: '' } })
    const select = getByRole('combobox') as HTMLSelectElement
    expect(select.value).toBe('')
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
    expect(select.getAttribute('style')).toContain('var(--renge-color-success)')
  })

  it('supports placeholder option', () => {
    const { getByText } = render(Select, {
      props: { placeholder: 'Choose one' },
    })
    expect(getByText('Choose one')).toBeTruthy()
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
