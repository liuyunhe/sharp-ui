import { onBeforeUnmount, onMounted, watchEffect } from 'vue'
import { addUnit } from '@/utils'
import type { ComputedRef, Ref } from 'vue'

/**
 * 使用Vue的ref和computedRef实现可拖动功能。
 * @param targetRef 目标元素的ref，被拖动的元素。
 * @param dragRef 拖动触发元素的ref。
 * @param draggable 是否可拖动的计算属性。
 * @param overflow 是否允许拖动超出边界。
 */
export const useDraggable = (
  targetRef: Ref<HTMLElement | undefined>,
  dragRef: Ref<HTMLElement | undefined>,
  draggable: ComputedRef<boolean>,
  overflow?: ComputedRef<boolean>
) => {
  // 记录拖动过程中的偏移量
  let transform = {
    offsetX: 0,
    offsetY: 0
  }

  /**
   * 鼠标按下时的处理函数，初始化拖动状态。
   * @param e 鼠标事件对象。
   */
  const onMousedown = (e: MouseEvent) => {
    // 记录鼠标按下的位置
    const downX = e.clientX
    const downY = e.clientY
    // 当前偏移量
    const { offsetX, offsetY } = transform

    // 目标元素的布局信息
    const targetRect = targetRef.value!.getBoundingClientRect()
    const targetLeft = targetRect.left
    const targetTop = targetRect.top
    const targetWidth = targetRect.width
    const targetHeight = targetRect.height

    // 页面可滚动区域的大小
    const clientWidth = document.documentElement.clientWidth
    const clientHeight = document.documentElement.clientHeight

    // 计算拖动的边界
    const minLeft = -targetLeft + offsetX
    const minTop = -targetTop + offsetY
    const maxLeft = clientWidth - targetLeft - targetWidth + offsetX
    const maxTop = clientHeight - targetTop - targetHeight + offsetY

    /**
     * 鼠标移动时的处理函数，更新元素位置。
     * @param e 鼠标事件对象。
     */
    const onMousemove = (e: MouseEvent) => {
      // 计算元素的新位置
      let moveX = offsetX + e.clientX - downX
      let moveY = offsetY + e.clientY - downY

      // 如果不允许超出边界，则限制元素的位置
      if (!overflow?.value) {
        moveX = Math.min(Math.max(moveX, minLeft), maxLeft)
        moveY = Math.min(Math.max(moveY, minTop), maxTop)
      }

      // 更新偏移量
      transform = {
        offsetX: moveX,
        offsetY: moveY
      }

      // 设置元素的新位置
      if (targetRef.value) {
        targetRef.value.style.transform = `translate(${addUnit(moveX)}, ${addUnit(moveY)})`
      }
    }

    /**
     * 鼠标松开时的处理函数，停止拖动。
     */
    const onMouseup = () => {
      // 移除拖动事件监听器
      document.removeEventListener('mousemove', onMousemove)
      document.removeEventListener('mouseup', onMouseup)
    }

    // 添加拖动事件监听器
    document.addEventListener('mousemove', onMousemove)
    document.addEventListener('mouseup', onMouseup)
  }

  /**
   * 开启拖动功能，为拖动触发元素添加鼠标按下事件监听器。
   */
  const onDraggable = () => {
    if (dragRef.value && targetRef.value) {
      dragRef.value.addEventListener('mousedown', onMousedown)
    }
  }

  /**
   * 关闭拖动功能，移除拖动触发元素的鼠标按下事件监听器。
   */
  const offDraggable = () => {
    if (dragRef.value && targetRef.value) {
      dragRef.value.removeEventListener('mousedown', onMousedown)
    }
  }

  // 在组件挂载时，根据draggable的值决定是否开启拖动功能
  onMounted(() => {
    watchEffect(() => {
      if (draggable.value) {
        onDraggable()
      } else {
        offDraggable()
      }
    })
  })

  // 在组件卸载前，关闭拖动功能
  onBeforeUnmount(() => {
    offDraggable()
  })
}
