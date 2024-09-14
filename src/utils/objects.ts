import { get, set } from 'lodash-unified'
import type { Entries } from 'type-fest'
import type { Arrayable } from '.'

/**
 * 获取对象的键名数组。
 * @param arr - 输入的对象。
 * @returns 对象的键名数组。
 */
export const keysOf = <T extends object>(arr: T) => Object.keys(arr) as Array<keyof T>

/**
 * 获取对象的键值对数组。
 * @param arr - 输入的对象。
 * @returns 对象的键值对数组。
 */
export const entriesOf = <T extends object>(arr: T) => Object.entries(arr) as Entries<T>

// 从 '@vue/shared' 导入 hasOwn，用于检查对象是否拥有特定的自身属性
// eslint-disable-next-line vue/prefer-import-from-vue
export { hasOwn } from '@vue/shared'

/**
 * 获取或设置对象的属性值。
 *
 * 提供了一个获取和设置对象属性值的方便方式，特别是在处理嵌套属性时。
 * 通过传入路径数组来访问和修改深层属性。
 *
 * @param obj - 要访问的对象。
 * @param path - 属性的路径，可以是字符串数组。
 * @param defaultValue - 当属性不存在时的默认值。
 * @returns 包含一个getter和setter的对象，用于获取和设置属性值。
 */
export const getProp = <T = any>(
  obj: Record<string, any>,
  path: Arrayable<string>,
  defaultValue?: any
): { value: T } => {
  return {
    get value() {
      // 使用 lodash-unified 的 get 方法安全地获取属性值
      return get(obj, path, defaultValue)
    },
    set value(val: any) {
      // 使用 lodash-unified 的 set 方法设置属性值
      set(obj, path, val)
    }
  }
}
