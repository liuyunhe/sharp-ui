import { isFunction } from '@/utils'

import type { ObjectDirective } from 'vue'

export const REPEAT_INTERVAL = 100
export const REPEAT_DELAY = 600

export interface RepeatClickOptions {
  interval?: number
  delay?: number
  handler: (...args: unknown[]) => unknown
}

/**
 * vRepeatClick指令定义了重复点击的行为。
 *
 * 该指令用于HTMLElement上，为元素添加重复点击的功能。当用户快速连续点击元素时，会按照设定的间隔和延迟调用指定的处理函数。
 *
 * @param el 指令绑定的DOM元素。
 * @param binding 指令的绑定对象，包含指令的值。
 */
export const vRepeatClick: ObjectDirective<
  HTMLElement,
  RepeatClickOptions | RepeatClickOptions['handler']
> = {
  /**
   * 在元素挂载之前执行的逻辑。
   *
   * 这里初始化了间隔ID和延迟ID，用于后续的定时器管理。并根据绑定值的类型，配置了间隔和延迟时间，并绑定了鼠标点击事件。
   *
   * @param el 指令绑定的DOM元素。
   * @param binding 指令的绑定对象，包含指令的值。
   */
  beforeMount(el, binding) {
    const value = binding.value
    // 根据绑定值是否为函数，来确定间隔和延迟的默认值。
    const { interval = REPEAT_INTERVAL, delay = REPEAT_DELAY } = isFunction(value) ? {} : value

    let intervalId: ReturnType<typeof setInterval> | undefined
    let delayId: ReturnType<typeof setTimeout> | undefined

    /**
     * 处理函数，根据绑定值的类型动态调用相应的函数。
     */
    const handler = () => (isFunction(value) ? value() : value.handler())

    /**
     * 清除定时器的方法。
     */
    const clear = () => {
      if (delayId) {
        clearTimeout(delayId)
        delayId = undefined
      }
      if (intervalId) {
        clearInterval(intervalId)
        intervalId = undefined
      }
    }

    // 绑定鼠标按下事件。
    el.addEventListener('mousedown', (evt: MouseEvent) => {
      // 仅处理主键点击。
      if (evt.button !== 0) return
      clear()
      handler()

      // 在鼠标抬起时清除定时器。
      document.addEventListener('mouseup', () => clear(), {
        once: true
      })

      // 延迟后设置定时器，按照设定的间隔调用处理函数。
      delayId = setTimeout(() => {
        intervalId = setInterval(() => {
          handler()
        }, interval)
      }, delay)
    })
  }
}
