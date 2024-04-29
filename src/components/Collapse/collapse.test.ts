import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Collapse from './Collapse.vue'

describe('Collapse.vue', () => {
  test('basic collapse', () => {
    const wrapper = mount(Collapse, {
      props: {},
      slots: {
        default: ''
      }
    })
    console.log(wrapper.html())
  })
})
