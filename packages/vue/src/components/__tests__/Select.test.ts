import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Select from '../Select.vue'

describe('Select', () => {
  it('renders select element', () => {
    const wrapper = mount(Select)
    expect(wrapper.find('select').exists()).toBe(true)
  })

  it('binds v-model', async () => {
    const wrapper = mount(Select, {
      props: { modelValue: '' },
      slots: {
        default: '<option value="a">Option A</option><option value="b">Option B</option>',
      },
    })
    await wrapper.find('select').setValue('a')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  it('applies size styles', () => {
    const wrapper = mount(Select, { props: { size: 'lg' } })
    const styles = window.getComputedStyle(wrapper.find('select').element)
    expect(styles.padding).toBeTruthy()
  })

  it('applies state styles', () => {
    const wrapper = mount(Select, { props: { state: 'success' } })
    const style = wrapper.find('select').element.style.border
    expect(style).toContain('var(--renge-color-success)')
  })

  it('supports disabled', () => {
    const wrapper = mount(Select, { props: { disabled: true } })
    expect(wrapper.find('select').attributes('disabled')).toBeDefined()
  })

  it('supports fullWidth', () => {
    const wrapper = mount(Select, { props: { fullWidth: true } })
    const styles = window.getComputedStyle(wrapper.find('select').element)
    expect(styles.width).toBe('100%')
  })

  it('emits change and focus events', async () => {
    const wrapper = mount(Select, {
      slots: {
        default: '<option value="">Choose</option><option value="a">Option A</option>',
      },
    })
    const select = wrapper.find('select')

    await select.trigger('focus')
    expect(wrapper.emitted('focus')).toBeTruthy()

    await select.trigger('blur')
    expect(wrapper.emitted('blur')).toBeTruthy()
  })
})
