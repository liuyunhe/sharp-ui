import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Collapse from './Collapse.vue'
import CollapseItem from './CollapseItem.vue'

describe('Collapse.vue', () => {
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
    const header = wrapper.findAll('.s-collapse-item__header')
    const contents = wrapper.findAll('.s-collapse-item__wrapper')

    // 长度
    expect(header.length).toBe(3)
    expect(contents.length).toBe(3)

    // 文本
    const firstHeader = header.at(0)!
    const secondHeader = header.at(1)!
    expect(firstHeader.text()).toBe('title a')

    // 内容
    const firstcontent = contents.at(0)!
    const secondContent = contents.at(1)!
    expect(firstcontent.isVisible()).toBeTruthy()
    expect(secondContent.isVisible()).toBeFalsy()
    expect(firstcontent.text()).toBe('content a')

    // 行为
    await firstHeader.trigger('click')
    expect(firstcontent.isVisible()).toBeFalsy()
    await secondHeader.trigger('click')
    expect(secondContent.isVisible()).toBeTruthy()

    // diabled
    const disabledHeader = header.at(2)!
    const disableContent = contents.at(2)!
    expect(disabledHeader.classes()).toContain('is-disabled')
    await disabledHeader.trigger('click')
    expect(disableContent.isVisible()).toBeFalsy()
  })

})
