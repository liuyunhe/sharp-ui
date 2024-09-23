import { computed, getCurrentInstance, inject, unref } from 'vue'
import { debugWarn, isClient } from '@/utils'
import { useGetDerivedNamespace } from './useNameSpace'

import type { InjectionKey, Ref } from 'vue'
import type { MaybeRef } from '@vueuse/core'

/**
 * 定义了ID注入上下文的类型，包括前缀和当前计数。
 */
export type SIdInjectionContext = {
  prefix: number
  current: number
}

/**
 * 默认的ID注入对象，包含一个随机前缀和当前计数为0。
 */
const defaultIdInjection = {
  prefix: Math.floor(Math.random() * 10000),
  current: 0
}

/**
 * 声明了一个 InjectionKey，用于在组件之间共享ID生成的上下文。
 */
export const ID_INJECTION_KEY: InjectionKey<SIdInjectionContext> = Symbol('elIdInjection')

/**
 * 提供了一个函数，用于获取当前组件实例的ID生成上下文。
 * 如果当前不在Vue实例中，则返回默认的ID生成上下文。
 */
export const useIdInjection = (): SIdInjectionContext => {
  return getCurrentInstance() ? inject(ID_INJECTION_KEY, defaultIdInjection) : defaultIdInjection
}

/**
 * 提供了一个函数，用于生成元素的唯一ID。
 * 如果提供了确定性的ID，则使用该ID；否则，根据命名空间和ID生成上下文生成一个唯一ID。
 * 在服务器渲染环境下，如果没有提供ID生成上下文，会发出警告。
 */
export const useId = (deterministicId?: MaybeRef<string>): Ref<string> => {
  const idInjection = useIdInjection()
  /* 在非客户端环境中，且ID注入上下文为默认值时，发出警告。这通常发生在服务器渲染环境下。 */
  if (!isClient && idInjection === defaultIdInjection) {
    debugWarn(
      'IdInjection',
      `Looks like you are using server rendering, you must provide a id provider to ensure the hydration process to be succeed
usage: app.provide(ID_INJECTION_KEY, {
  prefix: number,
  current: number,
})`
    )
  }

  /* 使用衍生的命名空间来确保ID的唯一性。 */
  const namespace = useGetDerivedNamespace()
  /* 计算最终的ID值，优先使用确定性的ID，如果未提供，则生成一个唯一的ID。 */
  const idRef = computed(
    () =>
      unref(deterministicId) ||
      `${namespace.value}-id-${idInjection.prefix}-${idInjection.current++}`
  )

  return idRef
}
