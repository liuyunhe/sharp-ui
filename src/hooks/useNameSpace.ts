import { computed, getCurrentInstance, inject, ref, unref } from 'vue'

import type { InjectionKey, Ref } from 'vue'

/**
 * 默认的命名空间前缀。
 */
export const defaultNamespace = 's'
/**
 * 状态前缀，用于生成BEM样式中的状态类。
 */
const statePrefix = 'is-'

/**
 * 根据提供的参数生成BEM样式类名。
 * @param namespace 命名空间字符串。
 * @param block 块名。
 * @param blockSuffix 块的后缀。
 * @param element 元素名。
 * @param modifier 修改器名。
 * @returns 生成的BEM类名。
 */
const _bem = (
  namespace: string,
  block: string,
  blockSuffix: string,
  element: string,
  modifier: string
) => {
  let cls = `${namespace}-${block}`
  if (blockSuffix) {
    cls += `-${blockSuffix}`
  }
  if (element) {
    cls += `__${element}`
  }
  if (modifier) {
    cls += `--${modifier}`
  }
  return cls
}

/**
 * 命名空间上下文的注入键。
 */
export const namespaceContextKey: InjectionKey<Ref<string | undefined>> =
  Symbol('namespaceContextKey')

/**
 * 使用提供的命名空间覆盖值获取派生的命名空间。
 * @param namespaceOverrides 命名空间覆盖的引用。
 * @returns 派生的命名空间的引用。
 */
export const useGetDerivedNamespace = (namespaceOverrides?: Ref<string | undefined>) => {
  const derivedNamespace =
    namespaceOverrides ||
    (getCurrentInstance()
      ? inject(namespaceContextKey, ref(defaultNamespace))
      : ref(defaultNamespace))
  const namespace = computed(() => {
    return unref(derivedNamespace) || defaultNamespace
  })
  return namespace
}

/**
 * 为给定的块名生成BEM命名空间实用工具。
 * @param block 块名。
 * @param namespaceOverrides 命名空间覆盖的引用。
 * @returns 包含BEM命名方法和相关实用工具的对象。
 */
export const useNamespace = (block: string, namespaceOverrides?: Ref<string | undefined>) => {
  const namespace = useGetDerivedNamespace(namespaceOverrides)
  /**
   * 生成块类名。
   * @param blockSuffix 块的后缀。
   * @returns 生成的块类名。
   */
  const b = (blockSuffix = '') => _bem(namespace.value, block, blockSuffix, '', '')
  /**
   * 生成元素类名。
   * @param element 元素名。
   * @returns 生成的元素类名。
   */
  const e = (element?: string) => (element ? _bem(namespace.value, block, '', element, '') : '')
  /**
   * 生成修改器类名。
   * @param modifier 修改器名。
   * @returns 生成的修改器类名。
   */
  const m = (modifier?: string) => (modifier ? _bem(namespace.value, block, '', '', modifier) : '')
  /**
   * 生成带有块后缀和元素的类名。
   * @param blockSuffix 块的后缀。
   * @param element 元素名。
   * @returns 生成的类名。
   */
  const be = (blockSuffix?: string, element?: string) =>
    blockSuffix && element ? _bem(namespace.value, block, blockSuffix, element, '') : ''
  /**
   * 生成带有元素和修改器的类名。
   * @param element 元素名。
   * @param modifier 修改器名。
   * @returns 生成的类名。
   */
  const em = (element?: string, modifier?: string) =>
    element && modifier ? _bem(namespace.value, block, '', element, modifier) : ''
  /**
   * 生成带有块后缀和修改器的类名。
   * @param blockSuffix 块的后缀。
   * @param modifier 修改器名。
   * @returns 生成的类名。
   */
  const bm = (blockSuffix?: string, modifier?: string) =>
    blockSuffix && modifier ? _bem(namespace.value, block, blockSuffix, '', modifier) : ''
  /**
   * 生成带有块后缀、元素和修改器的类名。
   * @param blockSuffix 块的后缀。
   * @param element 元素名。
   * @param modifier 修改器名。
   * @returns 生成的类名。
   */
  const bem = (blockSuffix?: string, element?: string, modifier?: string) =>
    blockSuffix && element && modifier
      ? _bem(namespace.value, block, blockSuffix, element, modifier)
      : ''
  /**
   * 生成状态类名。
   * @param name 状态名。
   * @param state 状态值，如果为真，则添加状态类名。
   * @returns 生成的状态类名。
   */
  const is: {
    (name: string, state: boolean | undefined): string
    (name: string): string
  } = (name: string, ...args: [boolean | undefined] | []) => {
    const state = args.length >= 1 ? args[0]! : true
    return name && state ? `${statePrefix}${name}` : ''
  }

  /**
   * 生成CSS变量对象。
   * @param object 包含CSS变量名和值的对象。
   * @returns 生成的CSS样式对象。
   */
  // for css var
  // --s-xxx: value;
  const cssVar = (object: Record<string, string>) => {
    const styles: Record<string, string> = {}
    for (const key in object) {
      if (object[key]) {
        styles[`--${namespace.value}-${key}`] = object[key]
      }
    }
    return styles
  }

  /**
   * 生成与块相关的CSS变量对象。
   * @param object 包含CSS变量名和值的对象。
   * @returns 生成的CSS样式对象。
   */
  // with block
  const cssVarBlock = (object: Record<string, string>) => {
    const styles: Record<string, string> = {}
    for (const key in object) {
      if (object[key]) {
        styles[`--${namespace.value}-${block}-${key}`] = object[key]
      }
    }
    return styles
  }

  /**
   * 生成CSS变量名。
   * @param name 变量名。
   * @returns 生成的CSS变量名。
   */
  const cssVarName = (name: string) => `--${namespace.value}-${name}`
  /**
   * 生成与块相关的CSS变量名。
   * @param name 变量名。
   * @returns 生成的CSS变量名。
   */
  const cssVarBlockName = (name: string) => `--${namespace.value}-${block}-${name}`

  return {
    namespace,
    b,
    e,
    m,
    be,
    em,
    bm,
    bem,
    is,
    // css
    cssVar,
    cssVarName,
    cssVarBlock,
    cssVarBlockName
  }
}

export type UseNamespaceReturn = ReturnType<typeof useNamespace>
