import { isClient } from '../browser'
import { easeInOutCubic } from '../easings'
import { isWindow } from '../types'
import { cAF, rAF } from '../raf'
import { getStyle } from './style'

/**
 * 判断元素是否允许滚动。
 * @param el 要检查的元素
 * @param isVertical 是否为垂直滚动，默认为undefined，表示不限制滚动方向
 * @returns 如果元素允许滚动，则返回true；否则返回false
 */
export const isScroll = (el: HTMLElement, isVertical?: boolean): boolean => {
  if (!isClient) return false

  const key = (
    {
      undefined: 'overflow',
      true: 'overflow-y',
      false: 'overflow-x',
    } as const
  )[String(isVertical)]!
  const overflow = getStyle(el, key)
  return ['scroll', 'auto', 'overlay'].some((s) => overflow.includes(s))
}

/**
 * 获取元素的滚动容器。
 * @param el 要检查的元素
 * @param isVertical 是否为垂直滚动，默认为undefined，表示不限制滚动方向
 * @returns 滚动容器，可能是Window或HTMLElement；如果没有滚动容器，则返回undefined
 */
export const getScrollContainer = (
  el: HTMLElement,
  isVertical?: boolean
): Window | HTMLElement | undefined => {
  if (!isClient) return

  let parent: HTMLElement = el
  while (parent) {
    if ([window, document, document.documentElement].includes(parent))
      return window

    if (isScroll(parent, isVertical)) return parent

    parent = parent.parentNode as HTMLElement
  }

  return parent
}

/**
 * 计算滚动条的宽度。
 * @param namespace 类名前缀，用于创建测试元素
 * @returns 滚动条的宽度
 */
let scrollBarWidth: number
export const getScrollBarWidth = (namespace: string): number => {
  if (!isClient) return 0
  if (scrollBarWidth !== undefined) return scrollBarWidth

  const outer = document.createElement('div')
  outer.className = `${namespace}-scrollbar__wrap`
  outer.style.visibility = 'hidden'
  outer.style.width = '100px'
  outer.style.position = 'absolute'
  outer.style.top = '-9999px'
  document.body.appendChild(outer)

  const widthNoScroll = outer.offsetWidth
  outer.style.overflow = 'scroll'

  const inner = document.createElement('div')
  inner.style.width = '100%'
  outer.appendChild(inner)

  const widthWithScroll = inner.offsetWidth
  outer.parentNode?.removeChild(outer)
  scrollBarWidth = widthNoScroll - widthWithScroll

  return scrollBarWidth
}

/**
 * 将元素滚动到其容器的顶部。
 * @param container 元素的容器
 * @param selected 要滚动到顶部的元素
 */
/**
 * Scroll with in the container element, positioning the **selected** element at the top
 * of the container
 */
export function scrollIntoView(
  container: HTMLElement,
  selected: HTMLElement
): void {
  if (!isClient) return

  if (!selected) {
    container.scrollTop = 0
    return
  }

  const offsetParents: HTMLElement[] = []
  let pointer = selected.offsetParent
  while (
    pointer !== null &&
    container !== pointer &&
    container.contains(pointer)
  ) {
    offsetParents.push(pointer as HTMLElement)
    pointer = (pointer as HTMLElement).offsetParent
  }
  const top =
    selected.offsetTop +
    offsetParents.reduce((prev, curr) => prev + curr.offsetTop, 0)
  const bottom = top + selected.offsetHeight
  const viewRectTop = container.scrollTop
  const viewRectBottom = viewRectTop + container.clientHeight

  if (top < viewRectTop) {
    container.scrollTop = top
  } else if (bottom > viewRectBottom) {
    container.scrollTop = bottom - container.clientHeight
  }
}

/**
 * 平滑滚动到指定位置。
 * @param container 滚动容器，可以是HTMLElement或Window
 * @param from 起始位置
 * @param to 目标位置
 * @param duration 滚动持续时间
 * @param callback 滚动完成后的回调函数
 */
export function animateScrollTo(
  container: HTMLElement | Window,
  from: number,
  to: number,
  duration: number,
  callback?: unknown
) {
  const startTime = Date.now()

  let handle: number | undefined
  const scroll = () => {
    const timestamp = Date.now()
    const time = timestamp - startTime
    const nextScrollTop = easeInOutCubic(
      time > duration ? duration : time,
      from,
      to,
      duration
    )

    if (isWindow(container)) {
      container.scrollTo(window.pageXOffset, nextScrollTop)
    } else {
      container.scrollTop = nextScrollTop
    }
    if (time < duration) {
      handle = rAF(scroll)
    } else if (typeof callback === 'function') {
      callback()
    }
  }

  scroll()

  return () => {
    handle && cAF(handle)
  }
}

/**
 * 获取滚动元素。
 * @param target 目标元素
 * @param container 滚动容器，可以是HTMLElement或Window
 * @returns 滚动元素
 */
export const getScrollElement = (
  target: HTMLElement,
  container: HTMLElement | Window
) => {
  if (isWindow(container)) {
    return target.ownerDocument.documentElement
  }
  return container
}

/**
 * 获取滚动位置。
 * @param container 滚动容器，可以是HTMLElement或Window
 * @returns 滚动位置
 */
export const getScrollTop = (container: HTMLElement | Window) => {
  if (isWindow(container)) {
    return window.scrollY
  }
  return container.scrollTop
}
