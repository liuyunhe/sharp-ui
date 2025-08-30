import { nextTick } from 'vue'
/**
 * 导入obtainAllFocusableElements函数，用于获取元素内所有可聚焦的元素。
 * 来自'@/utils'模块。
 */
import { obtainAllFocusableElements } from '@/utils'
/**
 * 导入EVENT_CODE常量，包含键盘事件的键码。
 * 来自'@/constants'模块。
 */
import { EVENT_CODE } from '@/constants'
/**
 * 导入ObjectDirective类型，用于定义Vue的对象指令。
 * 来自Vue的'vue'模块。
 */
import type { ObjectDirective } from 'vue'

/**
 * 定义一个常量FOCUSABLE_CHILDREN，用于在元素上存储可聚焦子元素的数组。
 */
export const FOCUSABLE_CHILDREN = '_trap-focus-children'
/**
 * 定义一个常量TRAP_FOCUS_HANDLER，用于在元素上存储焦点处理函数。
 */
export const TRAP_FOCUS_HANDLER = '_trap-focus-handler'

/**
 * 定义TrapFocusElement接口，扩展HTMLElement，添加FOCUSABLE_CHILDREN和TRAP_FOCUS_HANDLER属性。
 */ 
export interface TrapFocusElement extends HTMLElement {
  [FOCUSABLE_CHILDREN]: HTMLElement[]
  [TRAP_FOCUS_HANDLER]: (e: KeyboardEvent) => void
}

/**
 * 一个保存当前激活的焦点陷阱元素的数组。
 */
const FOCUS_STACK: TrapFocusElement[] = []

/**
 * 焦点处理函数，用于在按下键盘键时定向焦点。
 * @param e 键盘事件对象。
 */
const FOCUS_HANDLER = (e: KeyboardEvent) => {
  // 当焦点堆栈为空时，不执行任何操作
  // Getting the top layer.
  if (FOCUS_STACK.length === 0) return
  const focusableElement = FOCUS_STACK[FOCUS_STACK.length - 1][FOCUSABLE_CHILDREN]
  // 如果存在可聚焦元素且按下的是Tab键
  if (focusableElement.length > 0 && e.code === EVENT_CODE.tab) {
    // 如果只有一个可聚焦元素，阻止默认行为并聚焦该元素
    if (focusableElement.length === 1) {
      e.preventDefault()
      if (document.activeElement !== focusableElement[0]) {
        focusableElement[0].focus()
      }
      return
    }
    // 根据Shift键的状态和当前焦点的位置，定向焦点到前一个或后一个可聚焦元素
    const goingBackward = e.shiftKey
    const isFirst = e.target === focusableElement[0]
    const isLast = e.target === focusableElement[focusableElement.length - 1]
    if (isFirst && goingBackward) {
      e.preventDefault()
      focusableElement[focusableElement.length - 1].focus()
    }
    if (isLast && !goingBackward) {
      e.preventDefault()
      focusableElement[0].focus()
    }
    // 在测试环境中模拟焦点行为
    // the is critical since jsdom did not implement user actions, you can only mock it
    // DELETE ME: when testing env switches to puppeteer
    if (process.env.NODE_ENV === 'test') {
      const index = focusableElement.indexOf(e.target as HTMLElement)
      if (index !== -1) {
        focusableElement[goingBackward ? index - 1 : index + 1]?.focus()
      }
    }
  }
}

/**
 * 定义TrapFocus指令，用于创建一个焦点陷阱，防止焦点离开指定的元素区域。
 */
const TrapFocus: ObjectDirective = {
  /**
   * 指令的beforeMount钩子，用于初始化焦点陷阱。
   * @param el 指令绑定的元素。
   */
  beforeMount(el: TrapFocusElement) {
    // 获取并存储元素内的所有可聚焦元素
    el[FOCUSABLE_CHILDREN] = obtainAllFocusableElements(el)
    // 将元素添加到焦点堆栈
    FOCUS_STACK.push(el)
    // 如果是第一个添加的焦点陷阱，监听键盘事件
    if (FOCUS_STACK.length <= 1) {
      document.addEventListener('keydown', FOCUS_HANDLER)
    }
  },
  /**
   * 指令的updated钩子，用于更新焦点陷阱内的可聚焦元素列表。
   * @param el 指令绑定的元素。
   */
  updated(el: TrapFocusElement) {
    nextTick(() => {
      el[FOCUSABLE_CHILDREN] = obtainAllFocusableElements(el)
    })
  },
  /**
   * 指令的unmounted钩子，用于清理焦点陷阱。
   */
  unmounted() {
    // 从焦点堆栈移除当前元素
    FOCUS_STACK.shift()
    // 如果焦点堆栈为空，移除键盘事件监听器
    if (FOCUS_STACK.length === 0) {
      document.removeEventListener('keydown', FOCUS_HANDLER)
    }
  }
}

export default TrapFocus
