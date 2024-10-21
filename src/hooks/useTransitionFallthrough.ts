/* istanbul ignore file */
import { getCurrentInstance } from 'vue'

const AFTER_APPEAR = 'after-appear'
const AFTER_ENTER = 'after-enter'
const AFTER_LEAVE = 'after-leave'
const APPEAR = 'appear'
const APPEAR_CANCELLED = 'appear-cancelled'
const BEFORE_ENTER = 'before-enter'
const BEFORE_LEAVE = 'before-leave'
const ENTER = 'enter'
const ENTER_CANCELLED = 'enter-cancelled'
const LEAVE = 'leave'
const LEAVE_CANCELLED = 'leave-cancelled'

export const useTransitionFallthroughEmits = [
  AFTER_APPEAR,
  AFTER_ENTER,
  AFTER_LEAVE,
  APPEAR,
  APPEAR_CANCELLED,
  BEFORE_ENTER,
  BEFORE_LEAVE,
  ENTER,
  ENTER_CANCELLED,
  LEAVE,
  LEAVE_CANCELLED
] as const

// Sometimes we want to delegate the transition emitted event
// we have to right the function locally, which is not a good
// approach to this, so we created this hook for the event
// fallthrough

/**
 * NOTE:
 * This is only a delegator for delegating transition callbacks.
 * Use this at your need.
 */

/**
 * Simple usage
 *
 * In your setups:
 *
 * setup() {
 *   const fallthroughMethods = useTransitionFallthrough()
 *   return fallthrough
 * }
 *
 * In your template:
 *
 * <template>
 *  <transition name="whatever" v-bind="fallthrough">
 *    <slot />
 *  </transition>
 * </template>
 *
 */

/**
 * 钩子函数，用于在当前组件实例中处理过渡动画的各个阶段
 * 该函数通过调用 getCurrentInstance() 获取当前组件实例，并定义了一系列回调函数来处理动画事件
 * 主要目的是在动画的不同阶段触发相应的事件，以便外部可以监听和响应这些事件
 * 
 * @returns {Object} 返回一个对象，包含处理动画各个阶段的回调函数
 */
export const useTransitionFallthrough = () => {
  // 获取当前组件实例的 emit 函数，用于触发事件
  const { emit } = getCurrentInstance()!

  // 定义动画事件的回调函数
  return {
    /**
     * 在元素出现动画结束后调用
     * 触发 AFTER_APPEAR 事件，通知监听者出现动画结束
     */
    onAfterAppear: () => {
      emit(AFTER_APPEAR)
    },
    /**
     * 在元素进入动画结束后调用
     * 触发 AFTER_ENTER 事件，通知监听者进入动画结束
     */
    onAfterEnter: () => {
      emit(AFTER_ENTER)
    },
    /**
     * 在元素离开动画结束后调用
     * 触发 AFTER_LEAVE 事件，通知监听者离开动画结束
     */
    onAfterLeave: () => {
      emit(AFTER_LEAVE)
    },
    /**
     * 在元素出现动画被取消时调用
     * 触发 APPEAR_CANCELLED 事件，通知监听者出现动画被取消
     */
    onAppearCancelled: () => {
      emit(APPEAR_CANCELLED)
    },
    /**
     * 在元素进入动画开始前调用
     * 触发 BEFORE_ENTER 事件，通知监听者进入动画即将开始
     */
    onBeforeEnter: () => {
      emit(BEFORE_ENTER)
    },
    /**
     * 在元素离开动画开始前调用
     * 触发 BEFORE_LEAVE 事件，通知监听者离开动画即将开始
     */
    onBeforeLeave: () => {
      emit(BEFORE_LEAVE)
    },
    /**
     * 在元素进入动画开始时调用
     * 触发 ENTER 事件，通知监听者进入动画开始
     */
    onEnter: () => {
      emit(ENTER)
    },
    /**
     * 在元素进入动画被取消时调用
     * 触发 ENTER_CANCELLED 事件，通知监听者进入动画被取消
     */
    onEnterCancelled: () => {
      emit(ENTER_CANCELLED)
    },
    /**
     * 在元素离开动画开始时调用
     * 触发 LEAVE 事件，通知监听者离开动画开始
     */
    onLeave: () => {
      emit(LEAVE)
    },
    /**
     * 在元素离开动画被取消时调用
     * 触发 LEAVE_CANCELLED 事件，通知监听者离开动画被取消
     */
    onLeaveCancelled: () => {
      emit(LEAVE_CANCELLED)
    }
  }
}
