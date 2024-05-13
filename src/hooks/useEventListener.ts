
import { onBeforeUnmount, onMounted, type Ref, isRef, watch, unref } from 'vue'

/**
 * 使用自定义指令来管理事件监听器。
 * 当组件挂载时，添加事件监听器；当组件卸载时，移除事件监听器。
 *
 * @param target 目标元素或者Ref对象，监听器将被绑定到这个目标上。
 * @param event 需要监听的事件名称。
 * @param handler 当事件被触发时执行的处理函数。
 */
export default function useEventListener(
  target: Ref<EventTarget | null> | EventTarget,
  event: string,
  handler: (e: Event) => any
) {
  // 在组件挂载时，添加事件监听器
  onMounted(() => {
    // 如果target是Ref类型，则需要在Ref对象的值变化时，动态更新事件监听器
    if (isRef(target)) {
      watch(target, (value, oldValue) => {
        // 移除旧的监听器，添加新的监听器
        oldValue?.removeEventListener(event, handler)
        value?.addEventListener(event, handler)
      })
    } else {
      // 如果target不是Ref类型，直接添加监听器
      target.addEventListener(event, handler)
    }
  })
  // 在组件卸载前，移除事件监听器
  onBeforeUnmount(() => {
    unref(target)?.removeEventListener(event, handler)
  })
}
