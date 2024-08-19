import { isClient } from '../browser'

/**
 * 判断一个元素是否在指定的容器内（包括容器本身）。
 * @param el 待检查的元素
 * @param container 指定的容器元素或窗口对象
 * @returns 如果元素在容器内（包括容器本身），返回true；否则返回false。
 */
export const isInContainer = (
  el?: Element,
  container?: Element | Window
): boolean => {
  if (!isClient || !el || !container) return false

  const elRect = el.getBoundingClientRect()

  let containerRect: Pick<DOMRect, 'top' | 'bottom' | 'left' | 'right'>
  if (container instanceof Element) {
    containerRect = container.getBoundingClientRect()
  } else {
    containerRect = {
      top: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
      left: 0
    }
  }
  return (
    elRect.top < containerRect.bottom &&
    elRect.bottom > containerRect.top &&
    elRect.right > containerRect.left &&
    elRect.left < containerRect.right
  )
}

/**
 * 获取元素距离文档顶部的距离。
 * @param el 要计算距离的元素
 * @returns 元素距离文档顶部的距离。
 */
export const getOffsetTop = (el: HTMLElement) => {
  let offset = 0
  let parent = el

  while (parent) {
    offset += parent.offsetTop
    parent = parent.offsetParent as HTMLElement
  }

  return offset
}

/**
 * 计算两个元素之间的垂直距离。
 * @param el 元素A
 * @param containerEl 元素B，作为参考的容器元素
 * @returns 元素A距离元素B顶部的垂直距离的绝对值。
 */
export const getOffsetTopDistance = (el: HTMLElement, containerEl: HTMLElement) => {
  return Math.abs(getOffsetTop(el) - getOffsetTop(containerEl))
}

/**
 * 获取鼠标或触摸事件的客户端坐标。
 * @param event 鼠标或触摸事件对象
 * @returns 包含客户端X和Y坐标的对象。
 */
export const getClientXY = (event: MouseEvent | TouchEvent) => {
  let clientX: number
  let clientY: number
  if (event.type === 'touchend') {
    clientY = (event as TouchEvent).changedTouches[0].clientY
    clientX = (event as TouchEvent).changedTouches[0].clientX
  } else if (event.type.startsWith('touch')) {
    clientY = (event as TouchEvent).touches[0].clientY
    clientX = (event as TouchEvent).touches[0].clientX
  } else {
    clientY = (event as MouseEvent).clientY
    clientX = (event as MouseEvent).clientX
  }
  return {
    clientX,
    clientY
  }
}
