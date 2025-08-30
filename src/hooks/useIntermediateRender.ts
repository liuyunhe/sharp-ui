// 导入必要的 Vue 组合式 API 函数
import { nextTick, unref, watch } from 'vue'

// 导入 Vue 的 Ref 类型定义
import type { Ref } from 'vue'

// 定义 useDelayedRender 钩子使用的 props 类型
export type UseDelayedRenderProps = {
  indicator: Ref<boolean>
  intermediateIndicator: Ref<boolean>
  shouldSetIntermediate?: (step: 'show' | 'hide') => boolean
  beforeShow?: () => void
  beforeHide?: () => void
  afterShow?: () => void
  afterHide?: () => void
}

/**
 * 自定义钩子，用于管理延迟渲染逻辑。
 *
 * 该钩子用于控制某些组件的渲染过程，主要用于动画或过渡效果。
 * 它通过观察 indicator 和 intermediateIndicator 的变化，并在适当的时间执行相应的生命周期钩子函数来实现这一点。
 *
 * @param indicator 一个布尔值的 Ref，表示组件是否应该显示或隐藏。
 * @param intermediateIndicator 一个布尔值的 Ref，用于表示组件的中间状态。
 * @param shouldSetIntermediate 一个函数，用于确定在显示或隐藏过程中是否设置中间状态。
 * @param beforeShow 在显示组件之前执行的回调函数。
 * @param afterShow 在显示组件之后执行的回调函数。
 * @param afterHide 在隐藏组件之后执行的回调函数。
 * @param beforeHide 在隐藏组件之前执行的回调函数。
 */
export const useDelayedRender = ({
  indicator,
  intermediateIndicator,
  shouldSetIntermediate = () => true,
  beforeShow,
  afterShow,
  afterHide,
  beforeHide
}: UseDelayedRenderProps) => {
  // 监听 indicator 值的变化，以控制组件的显示或隐藏
  watch(
    () => unref(indicator),
    (val) => {
      if (val) {
        beforeShow?.()
        nextTick(() => {
          if (!unref(indicator)) return
          if (shouldSetIntermediate('show')) {
            intermediateIndicator.value = true
          }
        })
      } else {
        beforeHide?.()
        nextTick(() => {
          if (unref(indicator)) return

          if (shouldSetIntermediate('hide')) {
            intermediateIndicator.value = false
          }
        })
      }
    }
  )

  // 监听 intermediateIndicator 值的变化，以执行相应的钩子函数
  // 因为我们不总是自己设置这个值，所以我们只是监听它的状态变化，然后调用相应的钩子函数。
  watch(
    () => intermediateIndicator.value,
    (val) => {
      if (val) {
        afterShow?.()
      } else {
        afterHide?.()
      }
    }
  )
}
