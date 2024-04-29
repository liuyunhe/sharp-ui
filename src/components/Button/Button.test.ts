import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'
import Icon from '@/components/Icon/Icon.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// 描述Button.vue组件的测试用例
describe('Button.vue', () => {
  // 测试基础按钮渲染和功能
  test('basic button', () => {
    // 挂载Button组件，传入一系列props和slots
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
    // 打印和断言组件的HTML结构、类名、属性和文本内容
    console.log('🚀 ~ test ~ wrapper.html:', wrapper.html())
    console.log('🚀 ~ test ~ wrapper.classes:', wrapper.classes())
    console.log('🚀 ~ test ~ wrapper.attributes:', wrapper.attributes())
    console.log('🚀 ~ test ~ wrapper.text:', wrapper.text())

    // 断言按钮包含特定的类名
    expect(wrapper.classes()).toContain('s-button--primary')
    // 断言插槽内容是否正确
    expect(wrapper.get('button').text()).toBe('button')
    // 触发点击事件并断言是否正确派发了click事件
    wrapper.get('button').trigger('click')
    console.log('🚀 ~ test ~ wrapper.emitted:', wrapper.emitted())
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  // 测试禁用状态的按钮
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

    // 断言按钮具有禁用属性
    expect(wrapper.attributes('disabled')).toBeDefined()
    // 断言按钮元素的disabled属性
    expect(wrapper.find('button').element.disabled).toBeDefined()
    // 尝试触发点击事件并断言未派发click事件
    wrapper.get('button').trigger('click')
    expect(wrapper.emitted()).not.toHaveProperty('click')
  })

  // 测试按钮中包含的图标
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
    // 查找并断言图标组件存在，并且图标名称正确
    const iconElement = wrapper.findComponent(FontAwesomeIcon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('arrow-up')
  })

  // 测试加载状态的按钮
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
    // 查找并断言加载图标组件存在，并且图标名称为'spinner'
    const iconElement = wrapper.findComponent(Icon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('spinner')
    // 断言按钮具有禁用属性
    expect(wrapper.attributes('disabled')).toBeDefined()
  })
})
