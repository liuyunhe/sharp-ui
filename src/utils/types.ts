// eslint-disable-next-line vue/prefer-import-from-vue
import { isArray, isObject, isString } from '@vue/shared'
import { isNil } from 'lodash-unified'

export {
  isArray,
  isFunction,
  isObject,
  isString,
  isDate,
  isPromise,
  isSymbol
  // eslint-disable-next-line vue/prefer-import-from-vue
} from '@vue/shared'
export { isVNode } from 'vue'

/**
 * 判断一个值是否为未定义。
 * @param val 待检查的值
 * @returns 如果值为未定义，则返回true，否则返回false。
 */
export const isUndefined = (val: any): val is undefined => val === undefined

/**
 * 判断一个值是否为布尔值。
 * @param val 待检查的值
 * @returns 如果值为布尔值，则返回true，否则返回false。
 */
export const isBoolean = (val: any): val is boolean => typeof val === 'boolean'

/**
 * 判断一个值是否为数字。
 * @param val 待检查的值
 * @returns 如果值为数字，则返回true，否则返回false。
 */
export const isNumber = (val: any): val is number => typeof val === 'number'

/**
 * 判断一个值是否为空。
 * 空值定义为：null、undefined、空数组、空对象或false。
 * @param val 待检查的值
 * @returns 如果值为空，则返回true，否则返回false。
 */
export const isEmpty = (val: unknown) =>
  (!val && val !== 0) ||
  (isArray(val) && val.length === 0) ||
  (isObject(val) && !Object.keys(val).length)

/**
 * 判断一个值是否为元素。
 * @param e 待检查的值
 * @returns 如果值为元素，则返回true，否则返回false。
 */
export const isElement = (e: unknown): e is Element => {
  if (typeof Element === 'undefined') return false
  return e instanceof Element
}

/**
 * 判断一个属性是否缺失。
 * 属性缺失定义为值为null或undefined。
 * @param prop 待检查的属性
 * @returns 如果属性缺失，则返回true，否则返回false。
 */
export const isPropAbsent = (prop: unknown): prop is null | undefined => {
  return isNil(prop)
}

/**
 * 判断一个字符串是否可以转换为数字。
 * @param val 待检查的字符串
 * @returns 如果字符串可以转换为数字，则返回true，否则返回false。
 */
export const isStringNumber = (val: string): boolean => {
  if (!isString(val)) {
    return false
  }
  return !Number.isNaN(Number(val))
}

/**
 * 判断一个值是否为Window对象。
 * @param val 待检查的值
 * @returns 如果值为Window对象，则返回true，否则返回false。
 */
export const isWindow = (val: unknown): val is Window => {
  return val === window
}
