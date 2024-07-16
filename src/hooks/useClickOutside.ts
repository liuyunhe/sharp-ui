import { onMounted, onUnmounted, type Ref } from 'vue'

/**
 * 使用自定义指令v-click-outside实现点击外部区域触发回调函数的功能。
 *
 * @param elementRef 组件内部元素的引用，用于判断点击事件是否发生在该元素内部。
 * @param callback 当点击发生在元素外部时调用的回调函数。
 */
const useClickOutside = (
  elementRef: Ref<undefined | HTMLElement>,
  callback: (e: MouseEvent) => void
) => {
  /**
   * 点击事件的处理函数。
   *
   * @param e MouseEvent 点击事件对象。
   */
  const handler = (e: MouseEvent) => {
    if (elementRef.value && e.target) {
      if (!elementRef.value.contains(e.target as HTMLElement)) callback(e)
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
}

export default useClickOutside
