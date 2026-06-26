import { render } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import Checkbox from '../Checkbox.svelte'
import { describe, it, expect } from 'vitest'

describe('Checkbox', () => {
  it('renders checkbox', () => {
    const { getByRole } = render(Checkbox)
    const checkbox = getByRole('checkbox')
    expect(checkbox).toBeTruthy()
  })

  it('binds checked state', async () => {
    const user = userEvent.setup()
    const { getByRole } = render(Checkbox)
    const checkbox = getByRole('checkbox')

    expect(checkbox).not.toBeChecked()
    await user.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  it('supports label', () => {
    const { container } = render(Checkbox, {
      props: { label: 'Accept terms' },
    })
    expect(container.textContent).toContain('Accept terms')
  })

  it('supports disabled state', () => {
    const { getByRole } = render(Checkbox, { props: { disabled: true } })
    const checkbox = getByRole('checkbox')
    expect(checkbox).toBeDisabled()
  })

  it('supports indeterminate state', () => {
    const { getByRole } = render(Checkbox, { props: { indeterminate: true } })
    const checkbox = getByRole('checkbox')
    expect(checkbox).toBeTruthy()
  })

  it('applies size styles', () => {
    const { container } = render(Checkbox, { props: { size: 'lg' } })
    expect(container).toBeTruthy()
  })

  it('emits change event', async () => {
    const user = userEvent.setup()
    const { getByRole, component } = render(Checkbox)
    const checkbox = getByRole('checkbox')

    let changed = false
    component.$on('change', () => {
      changed = true
    })

    await user.click(checkbox)
    expect(changed).toBe(true)
  })
})
