import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../Button.vue'

describe('Button', () => {
  it('renders button element', () => {
    const wrapper = mount(Button)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('applies default props', () => {
    const wrapper = mount(Button, {
      props: { size: 'md', variant: 'solid', colorScheme: 'accent' },
    })
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('applies size styles', () => {
    const wrapper = mount(Button, { props: { size: 'lg' } })
    const button = wrapper.find('button')
    const styles = window.getComputedStyle(button.element)
    expect(styles.padding).toBeTruthy()
  })

  it('applies variant styles', () => {
    const wrapper = mount(Button, { props: { variant: 'outline' } })
    const styles = window.getComputedStyle(wrapper.find('button').element)
    expect(styles.border).toBeTruthy()
  })

  it('applies colorScheme', () => {
    const wrapper = mount(Button, { props: { colorScheme: 'danger' } })
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('emits click event', async () => {
    const wrapper = mount(Button)
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted()).toBeTruthy()
  })

  it('supports fullWidth', () => {
    const wrapper = mount(Button, { props: { fullWidth: true } })
    const styles = window.getComputedStyle(wrapper.find('button').element)
    expect(styles.width).toBe('100%')
  })

  it('renders slot content', () => {
    const wrapper = mount(Button, {
      slots: { default: 'Click me' },
    })
    expect(wrapper.text()).toContain('Click me')
  })
})
