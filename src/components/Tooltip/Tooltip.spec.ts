// s-tooltip.spec.ts
import { mount } from '@vue/test-utils'
import Tooltip from './Tooltip.vue'
import { describe, expect, it } from 'vitest'

describe('Tooltip', () => {
  // 测试用例1: 验证组件是否正常渲染
  it('renders correctly', () => {
    const wrapper = mount(Tooltip)

    expect(wrapper.classes()).toContain('s-tooltip')
    expect(wrapper.find('.s-tooltip__trigger').exists()).toBe(true)
    expect(wrapper.find('.s-tooltip__popper').exists()).toBe(false)
  })

  // 测试用例2: 验证触发器元素是否响应鼠标悬停事件
  it('triggers on mouseenter', async () => {
    const wrapper = mount(Tooltip)

    await wrapper.find('.s-tooltip__trigger').trigger('mouseenter')

    expect(wrapper.find('.s-tooltip__popper').exists()).toBe(true)
  })

  // 测试用例3: 验证是否可以通过外部方法显示和隐藏弹出层
  it('can be controlled by external methods', async () => {
    const wrapper = mount(Tooltip)

    await wrapper.vm.show()
    expect(wrapper.find('.s-tooltip__popper').exists()).toBe(true)

    await wrapper.vm.hide()
    expect(wrapper.find('.s-tooltip__popper').exists()).toBe(false)
  })
})
