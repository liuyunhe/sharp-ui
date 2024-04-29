import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'
import Icon from '@/components/Icon/Icon.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

describe('Button.vue', () => {
  test('basic button', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'primary',
        size: 'large',
        disabled: false,
        plain: true,
        round: false,
        circle: false,
        nativeType: 'submit'
      },
      slots: {
        default: 'button'
      }
    })
    console.log('🚀 ~ test ~ wrapper.html:', wrapper.html())
    console.log('🚀 ~ test ~ wrapper.classes:', wrapper.classes())
    console.log('🚀 ~ test ~ wrapper.attributes:', wrapper.attributes())
    console.log('🚀 ~ test ~ wrapper.text:', wrapper.text())

    // class
    expect(wrapper.classes()).toContain('s-button--primary')
    // slot
    expect(wrapper.get('button').text()).toBe('button')
    // events
    wrapper.get('button').trigger('click')
    console.log('🚀 ~ test ~ wrapper.emitted:', wrapper.emitted())
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  test('diabled button', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'primary',
        size: 'large',
        disabled: true
      },
      slots: {
        default: 'diabled'
      }
    })

    //attributes
    expect(wrapper.attributes('disabled')).toBeDefined()
    // attributes
    expect(wrapper.find('button').element.disabled).toBeDefined()
    wrapper.get('button').trigger('click')
    expect(wrapper.emitted()).not.toHaveProperty('click')
  })
    
  test('icon', () => {
    const wrapper = mount(Button, {
      props: {
        icon:'arrow-up'
      },
      slots: {
        default: 'icon'
      },
      global: {
        stubs: ['FontAwesomeIcon']
      }
    })
    console.log(wrapper.html())
    const iconElement = wrapper.findComponent(FontAwesomeIcon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('arrow-up')
  })

  test('loading', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true
      },
      slots: {
        default: 'loading'
      },
      global: {
        stubs: ['Icon']
      }
    })
    console.log(wrapper.html())
    const iconElement = wrapper.findComponent(Icon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('spinner')
    expect(wrapper.attributes('disabled')).toBeDefined()
  })
})
