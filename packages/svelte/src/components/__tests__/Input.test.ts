import { render } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import Input from '../Input.svelte'
import { describe, it, expect } from 'vitest'

describe('Input', () => {
  it('renders input element', () => {
    const { getByDisplayValue } = render(Input)
    const input = getByDisplayValue('')
    expect(input).toBeTruthy()
  })

  it('binds value', async () => {
    const user = userEvent.setup()
    const { getByRole } = render(Input)
    const input = getByRole('textbox')

    await user.type(input, 'hello')
    expect(input).toHaveValue('hello')
  })

  it('applies size styles', () => {
    const { getByRole } = render(Input, { props: { size: 'lg' } })
    const input = getByRole('textbox')
    const styles = window.getComputedStyle(input)
    expect(styles.padding).toBeTruthy()
  })

  it('applies state styles', () => {
    const { getByRole } = render(Input, { props: { state: 'error' } })
    const input = getByRole('textbox')
    expect(input.style.borderColor).toContain('danger')
  })

  it('handles focus/blur', async () => {
    const user = userEvent.setup()
    const { getByRole } = render(Input)
    const input = getByRole('textbox')

    await user.click(input)
    expect(document.activeElement).toBe(input)

    await user.tab()
    expect(document.activeElement).not.toBe(input)
  })

  it('supports placeholder', () => {
    const { getByPlaceholderText } = render(Input, {
      props: { placeholder: 'Enter text' },
    })
    expect(getByPlaceholderText('Enter text')).toBeTruthy()
  })

  it('supports disabled state', () => {
    const { getByRole } = render(Input, { props: { disabled: true } })
    const input = getByRole('textbox')
    expect(input).toHaveAttribute('disabled')
  })

  it('supports fullWidth', () => {
    const { getByRole } = render(Input, { props: { fullWidth: true } })
    const input = getByRole('textbox')
    const styles = window.getComputedStyle(input)
    expect(styles.width).toBe('100%')
  })
})
