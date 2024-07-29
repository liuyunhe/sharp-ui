import { onBeforeUnmount, onMounted } from 'vue'
import { isClient } from '@/utils'
import { EVENT_CODE } from '@/constants'

/**
 * 注册用于处理Esc键按下的回调函数。
 *
 * 此功能旨在使多个组件能够监听Esc键的按下事件，而无需重复添加事件监听器。
 * 通过将回调函数添加到全局处理程序列表中，当Esc键被按下时，所有注册的处理程序都将被调用。
 * 在组件卸载时，相应的处理程序将从列表中移除，以避免内存泄漏。
 */
let registeredEscapeHandlers: ((e: KeyboardEvent) => void)[] = []

/**
 * 缓存的事件处理函数，用于处理键盘事件。
 *
 * 这个函数的目的是为了避免在每个组件中都直接添加键盘事件监听器，从而减少性能开销。
 * 当Esc键被按下时，它将调用所有注册的处理程序。
 */
const cachedHandler = (e: Event) => {
  const event = e as KeyboardEvent
  if (event.key === EVENT_CODE.esc) {
    registeredEscapeHandlers.forEach((registeredHandler) => registeredHandler(event))
  }
}

/**
 * 使用Esc键的键盘下压事件。
 *
 * 此函数提供了一个方便的方法来注册一个回调函数，该函数将在按下Esc键时被调用。
 * 它利用Vue的生命周期钩子来添加和移除事件监听器，确保组件在挂载和卸载时正确处理事件。
 *
 * @param handler 处理Esc键按下的回调函数。它将接收键盘事件作为参数。
 */
export const useEscapeKeydown = (handler: (e: KeyboardEvent) => void) => {
  onMounted(() => {
    // 当没有注册任何处理程序时，添加键盘事件监听器
    if (registeredEscapeHandlers.length === 0) {
      document.addEventListener('keydown', cachedHandler)
    }
    // 将当前处理程序添加到注册列表中
    if (isClient) registeredEscapeHandlers.push(handler)
  })

  onBeforeUnmount(() => {
    // 从注册列表中移除当前处理程序
    registeredEscapeHandlers = registeredEscapeHandlers.filter(
      (registeredHandler) => registeredHandler !== handler
    )
    // 当注册列表为空时，移除键盘事件监听器
    if (registeredEscapeHandlers.length === 0) {
      if (isClient) document.removeEventListener('keydown', cachedHandler)
    }
  })
}
