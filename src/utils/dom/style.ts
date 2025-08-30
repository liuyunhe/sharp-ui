import { isNumber, isObject, isString, isStringNumber } from '../types'
import { isClient } from '../browser'
import { camelize } from '../strings'
import { entriesOf, keysOf } from '../objects'
import { debugWarn } from '../error'
import type { CSSProperties } from 'vue'

const SCOPE = 'utils/dom/style'

/**
 * 将类名字符串转换为数组形式。
 * @param cls 类名字符串，可以包含多个类名，用空格分隔。
 * @returns 过滤后的类名数组，不包含空格或空字符串。
 */
export const classNameToArray = (cls = '') =>
  cls.split(' ').filter((item) => !!item.trim())

/**
 * 检查元素是否包含指定的类名。
 * @param el DOM元素。
 * @param cls 要检查的类名。
 * @returns 如果元素包含类名，则返回true，否则返回false。
 */
export const hasClass = (el: Element, cls: string): boolean => {
  if (!el || !cls) return false
  if (cls.includes(' ')) throw new Error('className should not contain space.')
  return el.classList.contains(cls)
}

/**
 * 为元素添加一个或多个类名。
 * @param el DOM元素。
 * @param cls 要添加的类名字符串，可以包含多个类名，用空格分隔。
 */
export const addClass = (el: Element, cls: string) => {
  if (!el || !cls.trim()) return
  el.classList.add(...classNameToArray(cls))
}

/**
 * 从元素中移除一个或多个类名。
 * @param el DOM元素。
 * @param cls 要移除的类名字符串，可以包含多个类名，用空格分隔。
 */
export const removeClass = (el: Element, cls: string) => {
  if (!el || !cls.trim()) return
  el.classList.remove(...classNameToArray(cls))
}

/**
 * 获取元素的指定样式值。
 * @param element HTML元素。
 * @param styleName 样式名，可以是驼峰式或连字符式。
 * @returns 元素的指定样式值。
 */
export const getStyle = (
  element: HTMLElement,
  styleName: keyof CSSProperties
): string => {
  if (!isClient || !element || !styleName) return ''

  let key = camelize(styleName)
  if (key === 'float') key = 'cssFloat'
  try {
    const style = (element.style as any)[key]
    if (style) return style
    const computed: any = document.defaultView?.getComputedStyle(element, '')
    return computed ? computed[key] : ''
  } catch {
    return (element.style as any)[key]
  }
}

/**
 * 设置元素的指定样式值。
 * @param element HTML元素。
 * @param styleName 样式名，可以是驼峰式或连字符式。
 * @param value 样式值。
 */
export const setStyle = (
  element: HTMLElement,
  styleName: CSSProperties | keyof CSSProperties,
  value?: string | number
) => {
  if (!element || !styleName) return

  if (isObject(styleName)) {
    entriesOf(styleName).forEach(([prop, value]) =>
      setStyle(element, prop, value)
    )
  } else {
    const key: any = camelize(styleName)
    element.style[key] = value as any
  }
}

/**
 * 移除元素的指定样式值。
 * @param element HTML元素。
 * @param style 样式名，可以是对象或驼峰式/连字符式样式名。
 */
export const removeStyle = (
  element: HTMLElement,
  style: CSSProperties | keyof CSSProperties
) => {
  if (!element || !style) return

  if (isObject(style)) {
    keysOf(style).forEach((prop) => removeStyle(element, prop))
  } else {
    setStyle(element, style, '')
  }
}

/**
 * 为值添加单位。
 * @param value 需要添加单位的值，可以是数字或字符串。
 * @param defaultUnit 默认单位，默认为'px'。
 * @returns 添加单位后的字符串。
 */
export function addUnit(value?: string | number, defaultUnit = 'px') {
  if (!value) return ''
  if (isNumber(value) || isStringNumber(value)) {
    return `${value}${defaultUnit}`
  } else if (isString(value)) {
    return value
  }
  debugWarn(SCOPE, 'binding value must be a string or number')
}
