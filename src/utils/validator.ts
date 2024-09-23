/**
 * 从 '@/constants' 导入组件尺寸和日期选择类型常量。
 * 这里的导入语句为类型导入，用于在类型检查时引用定义在常量文件中的枚举类型。
 */
import { componentSizes, datePickTypes } from '@/constants'
import type { ComponentSize, DatePickType } from '@/constants'

/**
 * 验证给定的字符串是否为有效的组件尺寸。
 *
 * @param val 待验证的字符串，预期是组件尺寸的名称。
 * @returns 如果 `val` 是有效的组件尺寸或空字符串，则返回 true；否则返回 false。
 *
 * 此函数通过检查给定的字符串是否存在于组件尺寸的常量数组中来验证其有效性。
 * 包含空字符串是为了允许函数在验证失败时返回一个“空”值。
 */
export const isValidComponentSize = (val: string): val is ComponentSize | '' =>
  ['', ...componentSizes].includes(val)

/**
 * 验证给定的字符串是否为有效的日期选择类型。
 *
 * @param val 待验证的字符串，预期是日期选择类型的名称。
 * @returns 如果 `val` 是有效的日期选择类型，则返回 true；否则返回 false。
 *
 * 此函数通过检查给定的字符串是否存在于日期选择类型常量数组中来验证其有效性。
 * 注意这里使用类型断言将 `datePickTypes` 强制转换为字符串数组，以符合 `includes` 方法的期望参数类型。
 */
export const isValidDatePickType = (val: string): val is DatePickType =>
  ([...datePickTypes] as string[]).includes(val)
