/**
 * 组合事件处理函数。
 *
 * 该函数用于将两个事件处理函数合并为一个，先调用第一个处理函数（他们的处理函数），如果它没有阻止事件的默认行为，
 * 则调用第二个处理函数（我们的处理函数）。这在处理复杂事件逻辑时非常有用，例如需要在执行默认行为之前添加额外的验证或操作。
 *
 * @param theirsHandler 第一个事件处理函数，它有机会阻止事件的默认行为。
 * @param oursHandler 第二个事件处理函数，只有在第一个处理函数没有阻止事件时才会被调用。
 * @param options 配置对象，包含可选的检查默认行为是否被阻止的标志。
 * @returns 返回一个组合的事件处理函数，它根据条件调用适当的处理函数。
 */
export const composeEventHandlers = <E>(
  theirsHandler?: (event: E) => boolean | void,
  oursHandler?: (event: E) => void,
  { checkForDefaultPrevented = true } = {}
) => {
  const handleEvent = (event: E) => {
    const shouldPrevent = theirsHandler?.(event)

    if (checkForDefaultPrevented === false || !shouldPrevent) {
      return oursHandler?.(event)
    }
  }
  return handleEvent
}

/**
 * 仅在鼠标事件发生时执行处理函数。
 *
 * 这个高阶函数用于封装事件处理函数，确保只有在事件是由鼠标触发时才执行处理函数。
 * 这对于需要区分不同类型的输入设备（如鼠标或触摸屏）的交互非常有用。
 *
 * @param handler 原始的事件处理函数，它将只在鼠标事件上执行。
 * @returns 返回一个包装过的事件处理函数，它会检查事件类型并根据需要调用原始处理函数。
 */
type WhenMouseHandler = (e: PointerEvent) => any
export const whenMouse = (handler: WhenMouseHandler): WhenMouseHandler => {
  return (e: PointerEvent) =>
    e.pointerType === 'mouse' ? handler(e) : undefined
}
