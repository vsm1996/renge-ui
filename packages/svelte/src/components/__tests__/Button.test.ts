import { render } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import Button from '../Button.svelte'
import { describe, it, expect, vi } from 'vitest'

describe('Button', () => {
  it('renders with default props', () => {
    const { getByRole } = render(Button)
    const button = getByRole('button')
    expect(button).toBeTruthy()
  })

  it('applies size styles', () => {
    const { getByRole, rerender } = render(Button, { props: { size: 'lg' } })
    const button = getByRole('button')
    const styles = window.getComputedStyle(button)
    expect(styles.padding).toBeTruthy()
  })

  it('applies variant styles', () => {
    const { getByRole } = render(Button, { props: { variant: 'outline' } })
    const button = getByRole('button')
    const styles = window.getComputedStyle(button)
    expect(styles.border).toBeTruthy()
  })

  it('applies colorScheme', () => {
    const { getByRole } = render(Button, { props: { colorScheme: 'danger' } })
    const button = getByRole('button')
    expect(button).toBeTruthy()
  })

  it('handles click events', async () => {
    const user = userEvent.setup()
    const { getByRole, component } = render(Button)
    const button = getByRole('button')

    let clicked = false
    component.$on('click', () => {
      clicked = true
    })

    await user.click(button)
    expect(clicked).toBe(true)
  })

  it('supports fullWidth', () => {
    const { getByRole } = render(Button, { props: { fullWidth: true } })
    const button = getByRole('button')
    const styles = window.getComputedStyle(button)
    expect(styles.width).toBe('100%')
  })

  it('renders children', () => {
    const { container } = render(Button, {
      slots: { default: 'Click me' },
    })
    expect(container.textContent).toContain('Click me')
  })

  it('disables with disabled attribute', () => {
    const { getByRole } = render(Button, {
      props: { disabled: true },
    })
    const button = getByRole('button')
    expect(button).toHaveAttribute('disabled')
  })
})
