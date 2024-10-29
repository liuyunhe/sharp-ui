import { config, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ID_INJECTION_KEY, useId, useIdInjection } from '../useId'

// 测试没有注入值的情况
describe('no injection value', () => {
  // 测试结束后重置DOM
  afterEach(() => {
    document.body.innerHTML = ''
  })

  // 测试useIdInjection函数
  it('useIdInjection', () => {
    // 挂载一个Vue组件，该组件使用了useIdInjection
    const wrapper = mount({
      setup() {
        const idInjection = useIdInjection()
        return idInjection
      },
      template: '<div></div>'
    })

    // 验证prefix是一个最多4位的数字字符串，current为0
    expect(String(wrapper.vm.prefix)).toMatch(/^\d{0,4}$/)
    expect(wrapper.vm.current).toBe(0)
  })

  // 测试useId函数
  it('useId', () => {
    // 挂载一个Vue组件，该组件使用了useId
    const wrapper = mount({
      setup() {
        const id = useId()
        return { id }
      },
      render: () => undefined
    })

    // 验证id符合特定格式
    expect(wrapper.vm.id).toMatch(/^s-id-\d{0,4}-\d+$/)
  })
})

// 测试有注入值的情况
describe('with injection value', () => {
  // 测试前设置全局配置，注入ID_INJECTION_KEY
  beforeEach(() => {
    config.global.provide = {
      [ID_INJECTION_KEY as symbol]: {
        prefix: 1024,
        current: 0
      }
    }
  })

  // 测试结束后重置DOM和全局配置
  afterEach(() => {
    document.body.innerHTML = ''
    config.global.provide = {}
  })

  // 测试useIdInjection函数
  it('useIdInjection', () => {
    const wrapper = mount({
      setup() {
        const idInjection = useIdInjection()
        return idInjection
      },
      render: () => undefined
    })

    // 验证prefix和current与注入的值一致
    expect(wrapper.vm.prefix).toBe(1024)
    expect(wrapper.vm.current).toBe(0)
  })

  // 测试useId函数
  it('useId', () => {
    const wrapper = mount({
      setup() {
        const id = useId()
        return { id }
      },
      render: () => undefined
    })

    // 验证id符合特定格式
    expect(wrapper.vm.id).toBe('s-id-1024-0')
  })
})

// 测试在非客户端环境下使用默认idInjection时的警告
describe('useId warns in non-client environment with default idInjection', async () => {
  // 模拟相关函数和环境
  const mockGetCurrentInstance = vi.fn(() => false)
  const mockWarn = vi.fn()
  const mockIsClient = false

  // 测试前重置模块并模拟依赖
  beforeEach(() => {
    vi.resetModules()
    vi.doMock('vue', () => ({
      getCurrentInstance: mockGetCurrentInstance,
      ref: vi.fn(),
      computed: vi.fn()
    }))
    vi.doMock('@/utils', () => ({
      debugWarn: mockWarn,
      isClient: mockIsClient
    }))
  })

  // 测试后取消模拟
  afterEach(() => {
    vi.doUnmock('@/utils')
    vi.doUnmock('vue')
  })

  // 测试是否发出警告
  it('should warn', async () => {
    const { useId: mockUseId } = await import('../useId')
    mockUseId()
    expect(mockWarn).toHaveBeenCalled()
  })
})
