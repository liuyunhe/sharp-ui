// eslint-disable-next-line vue/prefer-import-from-vue
import { NOOP } from '@vue/shared'

/**
 * 此函数用于确保只有当mousedown和mouseup事件发生在同一个目标上时，才触发click事件。
 * 这对于防止移动浏览器中的幽灵点击很有用。
 *
 * @param handleClick 用户提供的自定义click事件处理器，仅当mousedown和mouseup事件发生在同一目标上时调用。
 * @returns 返回一个对象，包含onClick、onMousedown和OnMouseup事件处理器函数。
 */
export const useSameTarget = (handleClick?: (e: MouseEvent) => void) => {
  // 如果没有提供自定义click事件处理器，返回一组空操作(event handlers)。
  if (!handleClick) {
    return { onClick: NOOP, onMousedown: NOOP, onMouseup: NOOP }
  }

  // 用于记录mousedown事件是否发生在当前目标上。
  let mousedownTarget = false
  // 用于记录mouseup事件是否发生在当前目标上。
  let mouseupTarget = false

  // refer to this https://javascript.info/mouse-events-basics
  // events fired in the order: mousedown -> mouseup -> click
  // we need to set the mousedown handle to false after click fired.

  /**
   * click事件处理器。
   * 检查mousedown和mouseup事件是否发生在同一目标上，如果是，则调用自定义click事件处理器。
   * 处理后，重置mousedownTarget和mouseupTarget的状态。
   */
  const onClick = (e: MouseEvent) => {
    // 当且仅当mousedownTarget和mouseupTarget都为真时执行。
    if (mousedownTarget && mouseupTarget) {
      handleClick(e)
    }
    mousedownTarget = mouseupTarget = false
  }

  /**
   * mousedown事件处理器。
   * 如果mousedown事件发生在当前目标上，设置mousedownTarget状态为真。
   */
  const onMousedown = (e: MouseEvent) => {
    // marking current mousedown target.
    // 标记当前mousedown目标。
    mousedownTarget = e.target === e.currentTarget
  }

  /**
   * mouseup事件处理器。
   * 如果mouseup事件发生在当前目标上，设置mouseupTarget状态为真。
   */
  const onMouseup = (e: MouseEvent) => {
    // marking current mouseup target.
    // 标记当前mouseup目标。
    mouseupTarget = e.target === e.currentTarget
  }

  // 返回事件处理器函数集合。
  return { onClick, onMousedown, onMouseup }
}
