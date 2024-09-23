import { isString } from './types'

/**
 * 自定义错误类，用于在Element Plus框架中表示错误。
 * 继承自Error类，增加了错误名称的定制。
 */
class ElementPlusError extends Error {
  constructor(m: string) {
    super(m)
    this.name = 'ElementPlusError'
  }
}

/**
 * 抛出错误。
 *
 * 该函数用于在指定的上下文中抛出一个错误，错误信息包含上下文和具体消息。
 * 主要用于开发阶段捕获并提示错误。
 *
 * @param scope 错误的上下文，通常是一个标识符或类名。
 * @param m 错误的具体消息。
 * @throws {ElementPlusError} 抛出一个继承自Error的ElementPlusError实例。
 */
export function throwError(scope: string, m: string): never {
  throw new ElementPlusError(`[${scope}] ${m}`)
}

/**
 * 发出调试警告。
 *
 * 该函数用于在非生产环境中输出调试警告信息。
 * 支持两种调用方式：传递一个Error对象或一个字符串作为警告信息。
 * 如果传递的是一个字符串，则会将其作为上下文，与具体消息拼接后输出。
 *
 * @param scope 警告的上下文，可以是一个字符串或一个Error对象。
 * @param message （可选）当scope是一个字符串时，指定具体的警告消息。
 */
export function debugWarn(err: Error): void
export function debugWarn(scope: string, message: string): void
export function debugWarn(scope: string | Error, message?: string): void {
  if (process.env.NODE_ENV !== 'production') {
    const error: Error = isString(scope) ? new ElementPlusError(`[${scope}] ${message}`) : scope
    // eslint-disable-next-line no-console
    console.warn(error)
  }
}
