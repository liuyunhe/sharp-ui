import { computed, isRef, onScopeDispose, watch } from 'vue'
import {
  addClass,
  getScrollBarWidth,
  getStyle,
  hasClass,
  isClient,
  removeClass,
  throwError
} from '@/utils'
import { useNamespace } from './useNameSpace'

import type { Ref } from 'vue'
import type { UseNamespaceReturn } from './useNameSpace'

export type UseLockScreenOptions = {
  ns?: UseNamespaceReturn
  // shouldLock?: MaybeRef<boolean>
}

/**
 * Hook that monitoring the ref value to lock or unlock the screen.
 * When the trigger became true, it assumes modal is now opened and vice versa.
 * @param trigger {Ref<boolean>}
 */

/**
 * 使用锁定屏幕功能。
 * 当给定的触发器引用变为true时，锁定屏幕，反之则解锁屏幕。
 * @param trigger 触发屏幕锁定的引用。当其值为true时，锁定屏幕；为false时，解锁屏幕。
 * @param options 可选参数，用于自定义命名空间。
 */
export const useLockscreen = (
  trigger: Ref<boolean>,
  options: UseLockScreenOptions = {}
) => {
  // 检查传入的trigger是否为引用类型，如果不是，则抛出错误。
  if (!isRef(trigger)) {
    throwError(
      '[useLockscreen]',
      'You need to pass a ref param to this function'
    )
  }

  // 使用提供的命名空间或默认命名空间。
  const ns = options.ns || useNamespace('popup')

  // 计算隐藏类名。
  const hiddenCls = computed(() => ns.bm('parent', 'hidden'))

  // 如果不在客户端或body已经具有隐藏类，则直接返回。
  if (!isClient || hasClass(document.body, hiddenCls.value)) {
    return
  }

  // 初始化滚动条宽度、是否曾移除过隐藏类、body的宽度。
  let scrollBarWidth = 0
  let withoutHiddenClass = false
  let bodyWidth = '0'

  // 清理函数，用于解锁屏幕。
  const cleanup = () => {
    setTimeout(() => {
      removeClass(document?.body, hiddenCls.value)
      if (withoutHiddenClass && document) {
        document.body.style.width = bodyWidth
      }
    }, 200)
  }

  // 监视trigger的变化，根据值来锁定或解锁屏幕。
  watch(trigger, (val) => {
    if (!val) {
      cleanup()
      return
    }

    // 检查是否曾经移除过隐藏类，并记录body的宽度。
    withoutHiddenClass = !hasClass(document.body, hiddenCls.value)
    if (withoutHiddenClass) {
      bodyWidth = document.body.style.width
    }
    // 获取滚动条宽度。
    scrollBarWidth = getScrollBarWidth(ns.namespace.value)
    // 检查是否需要添加滚动条隐藏逻辑。
    const bodyHasOverflow =
      document.documentElement.clientHeight < document.body.scrollHeight
    const bodyOverflowY = getStyle(document.body, 'overflowY')
    if (
      scrollBarWidth > 0 &&
      (bodyHasOverflow || bodyOverflowY === 'scroll') &&
      withoutHiddenClass
    ) {
      document.body.style.width = `calc(100% - ${scrollBarWidth}px)`
    }
    // 添加隐藏类到body。
    addClass(document.body, hiddenCls.value)
  })
  // 在作用域销毁时清理，即解锁屏幕。
  onScopeDispose(() => cleanup())
}
