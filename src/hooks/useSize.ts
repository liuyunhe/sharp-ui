import { computed, inject, unref } from 'vue'
import { buildProp } from '@/utils'
import { componentSizes } from '@/constants'

// 导入类型定义，增强代码的可读性和可维护性
import type { InjectionKey, Ref } from 'vue'
import type { ComponentSize } from '@/constants'

/**
 * 定义尺寸属性，用于组件的props选项。
 * 允许组件接收特定于尺寸的字符串值，这些值由组件尺寸常量定义。
 */
export const useSizeProp = buildProp({
  type: String,
  values: componentSizes,
  required: false
} as const)

/**
 * 提供组件可用的尺寸属性配置。
 */
export const useSizeProps = {
  size: useSizeProp
}

/**
 * 定义一个上下文接口，用于封装尺寸的引用。
 * 这使得在不同的组件中可以共享和访问尺寸信息。
 */
export interface SizeContext {
  size: Ref<ComponentSize>
}

/**
 * 定义一个注入键，用于跨组件共享尺寸上下文。
 * 这是一个符号，保证了全局唯一性，避免了命名冲突。
 */
export const SIZE_INJECTION_KEY: InjectionKey<SizeContext> = Symbol('size')

/**
 * 提供一个全局尺寸的计算属性。
 * 通过Vue的inject函数注入尺寸上下文，然后计算出当前应使用的尺寸。
 * 如果没有注入尺寸上下文，则默认返回空字符串。
 */
export const useGlobalSize = () => {
  // 从父组件或根组件中注入尺寸上下文
  const injectedSize = inject(SIZE_INJECTION_KEY, {} as SizeContext)

  // 计算并返回当前应使用的尺寸，如果没有注入则使用空字符串作为默认值
  return computed<ComponentSize>(() => {
    return unref(injectedSize.size) || ''
  })
}
