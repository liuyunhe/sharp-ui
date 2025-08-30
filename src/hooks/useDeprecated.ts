import { unref, watch } from 'vue'
import { debugWarn } from '@/utils'

// 导入类型定义，用于增强类型检查
import type { MaybeRef } from '@vueuse/core'

/**
 * 使用deprecated警告的参数类型定义。
 * 这些参数提供了关于弃用的信息，包括来源、替代方案、作用域、版本号等。
 */
type DeprecationParam = {
  from: string // 被弃用的属性、方法或事件的名称
  replacement: string // 替代的属性、方法或事件的名称
  scope: string // 弃用的上下文或模块名称
  version: string // 弃用的版本号
  ref: string // 更多信息的链接或引用
  type?: 'API' | 'Attribute' | 'Event' | 'Slot' // 被弃用的类型，如API、属性、事件、插槽
}

/**
 * 监视并警告使用了被弃用的特性。
 * 当指定的条件满足时，会在控制台输出弃用警告，建议使用新的特性替代。
 *
 * @param {DeprecationParam} param0 弃用警告的参数对象，包括弃用信息和类型。
 * @param condition 一个布尔值或引用类型，当其为真时，触发弃用警告。
 */
export const useDeprecated = (
  { from, replacement, scope, version, ref, type = 'API' }: DeprecationParam,
  condition: MaybeRef<boolean>
) => {
  // 使用Vue的watch函数监听condition的变化
  watch(
    () => unref(condition), // 确保condition是解引用的，以直接获取其值
    (val) => {
      if (val) {
        // 如果condition为真，触发弃用警告
        debugWarn(
          scope,
          `[${type}] ${from} is about to be deprecated in version ${version}, please use ${replacement} instead.
For more detail, please visit: ${ref}
`
        )
      }
    },
    {
      immediate: true // 立即执行一次检查，确保在组件初始化时就能发出弃用警告
    }
  )
}
