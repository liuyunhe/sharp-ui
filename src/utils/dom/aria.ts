/**
 * 定义可聚焦元素的选择器。
 * 这些选择器用于筛选页面上所有可能通过tab键聚焦的元素。
 */
const FOCUSABLE_ELEMENT_SELECTORS = `a[href],button:not([disabled]),button:not([hidden]),:not([tabindex="-1"]),input:not([disabled]),input:not([type="hidden"]),select:not([disabled]),textarea:not([disabled])`

/**
 * 判断给定元素是否在视觉上可见。
 *
 * 注意：此函数主要用于非测试环境，以确定元素是否可见。
 * 在测试环境中，任何元素都被视为可见。
 */

/**
 * Determine if the testing element is visible on screen no matter if its on the viewport or not
 */
export const isVisible = (element: HTMLElement) => {
  if (process.env.NODE_ENV === 'test') return true
  const computed = getComputedStyle(element)
  // element.offsetParent won't work on fix positioned
  // WARNING: potential issue here, going to need some expert advices on this issue
  return computed.position === 'fixed' ? false : element.offsetParent !== null
}

/**
 * 获取给定元素内所有可聚焦的元素。
 * 
 * 该函数通过查询给定元素内的所有元素，并筛选出那些既可聚焦又可视的元素。
 * 可聚焦元素是指在用户界面中可以通过键盘导航或获得焦点的元素。
 * 可视元素是指在当前视口内对用户可见的元素。
 * 
 * @param element - 被查询的元素，通常是页面或组件内的一个容器。
 * @returns 一个包含所有可聚焦且可视元素的数组。
 */
export const obtainAllFocusableElements = (
  element: HTMLElement
): HTMLElement[] => {
  // 使用FOCUSABLE_ELEMENT_SELECTORS选择器查询所有可能可聚焦的元素
  // 然后通过filter过滤出确实可聚焦且可视的元素
  return Array.from(
    element.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENT_SELECTORS)
  ).filter((item: HTMLElement) => isFocusable(item) && isVisible(item))
}

/**
 * 判断给定元素是否可聚焦。
 *
 * @param element - 要检查的元素。
 * @returns 如果元素可聚焦则返回true，否则返回false。
 */
/**
 * @desc Determine if target element is focusable
 * @param element {HTMLElement}
 * @returns {Boolean} true if it is focusable
 */
export const isFocusable = (element: HTMLElement): boolean => {
  if (
    element.tabIndex > 0 ||
    (element.tabIndex === 0 && element.getAttribute('tabIndex') !== null)
  ) {
    return true
  }
  // HTMLButtonElement has disabled
  if ((element as HTMLButtonElement).disabled) {
    return false
  }

  switch (element.nodeName) {
    case 'A': {
      // casting current element to Specific HTMLElement in order to be more type precise
      return (
        !!(element as HTMLAnchorElement).href &&
        (element as HTMLAnchorElement).rel !== 'ignore'
      )
    }
    case 'INPUT': {
      return !(
        (element as HTMLInputElement).type === 'hidden' ||
        (element as HTMLInputElement).type === 'file'
      )
    }
    case 'BUTTON':
    case 'SELECT':
    case 'TEXTAREA': {
      return true
    }
    default: {
      return false
    }
  }
}

/**
 * 尝试将焦点设置在给定的元素上。
 *
 * @param element - 要聚焦的元素。
 * @returns 如果焦点成功设置在元素上，则返回true，否则返回false。
 */
/**
 * @desc Set Attempt to set focus on the current node.
 * @param element The node to attempt to focus on.
 * @returns true if element is focused.
 */
export const attemptFocus = (element: HTMLElement): boolean => {
  if (!isFocusable(element)) {
    return false
  }
  // Remove the old try catch block since there will be no error to be thrown
  element.focus?.()
  return document.activeElement === element
}

/**
 * 触发指定的事件。
 *
 * @param elm - 要触发事件的元素。
 * @param name - 事件名称。
 * @param opts - 事件特定选项。
 * @returns 触发事件的元素。
 */
/**
 * Trigger an event
 * mouseenter, mouseleave, mouseover, keyup, change, click, etc.
 * @param  {HTMLElement} elm
 * @param  {String} name
 * @param  {*} opts
 */
export const triggerEvent = function (
  elm: HTMLElement,
  name: string,
  ...opts: Array<boolean>
): HTMLElement {
  let eventName: string

  if (name.includes('mouse') || name.includes('click')) {
    eventName = 'MouseEvents'
  } else if (name.includes('key')) {
    eventName = 'KeyboardEvent'
  } else {
    eventName = 'HTMLEvents'
  }
  const evt = document.createEvent(eventName)

  evt.initEvent(name, ...opts)
  elm.dispatchEvent(evt)
  return elm
}

/**
 * 判断元素是否为叶子节点。
 *
 * 叶子节点指的是没有aria-owns属性的元素。
 * 这在某些情况下用于确定元素是否应该接收焦点。
 *
 * @param el - 要检查的元素。
 * @returns 如果元素是叶子节点，则返回true，否则返回false。
 */
export const isLeaf = (el: HTMLElement) => !el.getAttribute('aria-owns')

export const getSibling = (
  el: HTMLElement,
  distance: number,
  elClass: string
) => {
  const { parentNode } = el
  if (!parentNode) return null
  const siblings = parentNode.querySelectorAll(elClass)
  const index = Array.prototype.indexOf.call(siblings, el)
  return siblings[index + distance] || null
}

/**
 * 将焦点设置在给定的元素上，并根据需要触发点击事件。
 *
 * 此函数用于确保元素不仅获得焦点，而且如果它是一个非叶子节点，
 * 则还会触发点击事件，以模拟用户的行为。
 *
 * @param el - 要聚焦和可能点击的元素。
 */
export const focusNode = (el: HTMLElement) => {
  if (!el) return
  el.focus()
  !isLeaf(el) && el.click()
}
