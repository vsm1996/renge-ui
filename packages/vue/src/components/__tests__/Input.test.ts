import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Input from '../Input.vue'

describe('Input', () => {
  it('renders input element', () => {
    const wrapper = mount(Input)
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
  })

  it('binds v-model', async () => {
    const wrapper = mount(Input, {
      props: { modelValue: '' },
    })
    await wrapper.find('input').setValue('hello')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  it('applies size styles', () => {
    const wrapper = mount(Input, { props: { size: 'lg' } })
    const styles = window.getComputedStyle(wrapper.find('input').element)
    expect(styles.padding).toBeTruthy()
  })

  it('applies state styles', () => {
    const wrapper = mount(Input, { props: { state: 'error' } })
    const style = wrapper.find('input').element.style.border
    expect(style).toContain('var(--renge-color-danger)')
  })

  it('handles focus/blur', async () => {
    const wrapper = mount(Input)
    const input = wrapper.find('input')

    await input.trigger('focus')
    expect(wrapper.emitted('focus')).toBeTruthy()

    await input.trigger('blur')
    expect(wrapper.emitted('blur')).toBeTruthy()
  })

  it('supports placeholder', () => {
    const wrapper = mount(Input, {
      props: { placeholder: 'Enter text' },
    })
    expect(wrapper.find('input').attributes('placeholder')).toBe('Enter text')
  })

  it('supports disabled', () => {
    const wrapper = mount(Input, { props: { disabled: true } })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('supports fullWidth', () => {
    const wrapper = mount(Input, { props: { fullWidth: true } })
    const styles = window.getComputedStyle(wrapper.find('input').element)
    expect(styles.width).toBe('100%')
  })
})
