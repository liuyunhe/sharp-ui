import { computed, inject, isRef, ref, unref } from 'vue'
import { get } from 'lodash-unified'
import English from '@/locale/lang/en'

import type { MaybeRef } from '@vueuse/core'
import type { InjectionKey, Ref } from 'vue'
import type { Language } from '@/locale'

/**
 * 翻译器选项类型，用于存储翻译键和对应的值或数字。
 */
export type TranslatorOption = Record<string, string | number>

/**
 * 翻译函数类型，接受一个路径和选项，返回翻译后的字符串。
 */
export type Translator = (path: string, option?: TranslatorOption) => string

/**
 * 本地化上下文类型，包含本地化语言、语言代码和翻译函数。
 */
export type LocaleContext = {
  locale: Ref<Language>
  lang: Ref<string>
  t: Translator
}

/**
 * 创建一个翻译函数，根据提供的本地化语言进行翻译。
 *
 * @param locale 本地化语言，可能是Vue的ref或普通对象。
 * @returns 返回一个翻译函数，用于根据给定的路径和选项翻译文本。
 */
export const buildTranslator =
  (locale: MaybeRef<Language>): Translator =>
  (path, option) =>
    translate(path, option, unref(locale))

/**
 * 根据提供的路径、选项和本地化语言，执行实际的翻译操作。
 *
 * @param path 翻译文本的路径，使用点符号表示对象的嵌套属性。
 * @param option 翻译选项，用于替换路径中定义的占位符。
 * @param locale 本地化语言对象。
 * @returns 返回翻译后的文本，如果路径不存在，则返回原始路径。
 */
export const translate = (
  path: string,
  option: undefined | TranslatorOption,
  locale: Language
): string =>
  (get(locale, path, path) as string).replace(
    /\{(\w+)\}/g,
    (_, key) => `${option?.[key] ?? `{${key}}`}` // 如果选项中存在占位符的值，则替换；否则保留占位符。
  )

/**
 * 创建本地化上下文对象，包含语言、语言代码和翻译函数。
 *
 * @param locale 本地化语言，可能是Vue的ref或普通对象。
 * @returns 返回一个本地化上下文对象，用于在组件中使用。
 */
export const buildLocaleContext = (locale: MaybeRef<Language>): LocaleContext => {
  const lang = computed(() => unref(locale).name) // 计算属性，获取语言代码。
  const localeRef = isRef(locale) ? locale : ref(locale) // 根据输入类型，创建相应的ref。
  return {
    lang,
    locale: localeRef,
    t: buildTranslator(locale) // 创建翻译函数。
  }
}

/**
 * 本地化上下文的注入键，用于在组件中注入本地化上下文。
 */
export const localeContextKey: InjectionKey<Ref<Language | undefined>> = Symbol('localeContextKey')

/**
 * 初始化并返回本地化上下文，如果提供了自定义的本地化语言，则使用之；否则使用默认语言。
 *
 * @param localeOverrides 可以覆盖默认本地化语言的ref。
 * @returns 返回一个本地化上下文对象，用于在组件中使用。
 */
export const useLocale = (localeOverrides?: Ref<Language | undefined>) => {
  // 根据是否有自定义本地化语言，决定使用哪个locale。
  const locale = localeOverrides || inject(localeContextKey, ref())!
  // 创建并返回本地化上下文。
  return buildLocaleContext(computed(() => locale.value || English))
}
