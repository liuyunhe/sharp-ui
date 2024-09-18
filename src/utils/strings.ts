/**
 * 从 '@vue/shared' 模块导入 camelize、hyphenate 和 kebabCase 函数。
 * 这里使用了别名 kebabCase 来重写 hyphenate，以提供更直观的函数命名。
 *
 * @remarks
 * 这些函数用于字符串转换，是 Vue.js 核心功能的一部分。
 */
// eslint-disable-next-line vue/prefer-import-from-vue
import { capitalize as toCapitalize } from '@vue/shared'
export {
  camelize,
  hyphenate,
  hyphenate as kebabCase // alias
  // eslint-disable-next-line vue/prefer-import-from-vue
} from '@vue/shared'

/**
 * 将字符串中的特殊字符转义为正则表达式安全的格式。
 *
 * @param string - 待转义的字符串，默认为空字符串。
 * @returns 转义后的字符串。
 *
 * @remarks
 * 该函数用于处理正则表达式中可能引起问题的字符，确保它们可以在正则表达式中安全使用。
 * 它是基于 sindresorhus 的 escape-string-regexp 库实现的。
 */
/**
 * fork from {@link https://github.com/sindresorhus/escape-string-regexp}
 */
export const escapeStringRegexp = (string = '') =>
  string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d')

/**
 * 将字符串的首字母大写。
 *
 * @param str - 待处理的字符串。
 * @returns 大写首字母的字符串。
 *
 * @remarks
 * 该函数使用了 TypeScript 的泛型来保持类型信息的准确性。
 * 它通过将字符串的第一个字符转换为大写，然后与剩余的字符串拼接来实现。
 */
// NOTE: improve capitalize types. Restore previous code after the [PR](https://github.com/vuejs/core/pull/6212) merge
export const capitalize = <T extends string>(str: T) =>
  toCapitalize(str) as Capitalize<T>
