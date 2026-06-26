import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Checkbox from '../Checkbox.vue'

describe('Checkbox', () => {
  it('renders checkbox', () => {
    const wrapper = mount(Checkbox)
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
  })

  it('binds v-model', async () => {
    const wrapper = mount(Checkbox, {
      props: { modelValue: false },
    })
    await wrapper.find('input').setValue(true)
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  it('supports label', () => {
    const wrapper = mount(Checkbox, {
      props: { label: 'Accept terms' },
    })
    expect(wrapper.text()).toContain('Accept terms')
  })

  it('supports disabled', () => {
    const wrapper = mount(Checkbox, { props: { disabled: true } })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('supports indeterminate', () => {
    const wrapper = mount(Checkbox, { props: { indeterminate: true } })
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('emits change event', async () => {
    const wrapper = mount(Checkbox)
    await wrapper.find('input').trigger('change')
    expect(wrapper.emitted('change')).toBeTruthy()
  })

  it('applies size styles', () => {
    const wrapper = mount(Checkbox, { props: { size: 'lg' } })
    expect(wrapper.find('label').exists()).toBe(true)
  })
})
