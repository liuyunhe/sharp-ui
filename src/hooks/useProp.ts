import { computed, getCurrentInstance } from 'vue'
import type { ComputedRef } from 'vue'

/**
 * 使用给定的属性名称，创建一个计算属性，用于获取当前Vue实例的属性值。
 * 
 * 这个函数主要用于在Vue组件中，通过计算属性的方式动态获取组件的props值。
 * 通过传入属性名称，函数内部会尝试获取当前Vue实例的props对象中对应属性的值。
 * 如果实例或属性不存在，则返回undefined。
 * 
 * @param name 属性名称，用于获取对应属性的值。
 * @returns 返回一个计算属性，该计算属性在访问时会返回当前Vue实例中对应属性的值。
 */
export const useProp = <T>(name: string): ComputedRef<T | undefined> => {
  // 获取当前Vue实例
  const vm = getCurrentInstance()
  // 创建一个计算属性，用于获取实例的props中指定名称的属性值
  return computed(() => (vm?.proxy?.$props as any)?.[name])
}
