import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Collapse from './Collapse.vue'
import CollapseItem from './CollapseItem.vue'

// 对Collapse组件的基本功能进行测试
describe('Collapse.vue', () => {
   // 挂载组件，设置初始展开项为['a']，并使用Icon组件的stub
  test('basic collapse',async () => {
    const wrapper = mount(
      () => (
        <Collapse modelValue={['a']}>
          <CollapseItem name="a" title="title a">
            content a
          </CollapseItem>
          <CollapseItem name="b" title="title b">
            content b
          </CollapseItem>
          <CollapseItem name="c" title="title c" disabled>
            content c
          </CollapseItem>
        </Collapse>
      ),
      {
        global: {
          stubs: ['Icon']
        },
        attachTo: document.body
      },
    )
    console.log(wrapper.html())
    // 查找所有的面板头和内容区域
    const header = wrapper.findAll('.s-collapse-item__header')
    const contents = wrapper.findAll('.s-collapse-item__wrapper')

   // 测试初始状态：长度、文本内容及可见性
    expect(header.length).toBe(3)
    expect(contents.length).toBe(3)

    // 验证面板头的文本内容
    const firstHeader = header.at(0)!
    const secondHeader = header.at(1)!
    expect(firstHeader.text()).toBe('title a')

     // 验证内容区域的可见性
    const firstcontent = contents.at(0)!
    const secondContent = contents.at(1)!
    expect(firstcontent.isVisible()).toBeTruthy()
    expect(secondContent.isVisible()).toBeFalsy()
    expect(firstcontent.text()).toBe('content a')

    // 测试点击事件：展开和隐藏内容
    await firstHeader.trigger('click')
    expect(firstcontent.isVisible()).toBeFalsy()
    await secondHeader.trigger('click')
    expect(secondContent.isVisible()).toBeTruthy()

    // 测试禁用状态的面板头和内容区域
    const disabledHeader = header.at(2)!
    const disableContent = contents.at(2)!
    expect(disabledHeader.classes()).toContain('is-disabled')
    await disabledHeader.trigger('click')
    expect(disableContent.isVisible()).toBeFalsy()
  })

})
