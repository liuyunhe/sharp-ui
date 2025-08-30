/**
 * 缓动函数：三次方缓进缓出
 *
 * 该函数用于计算动画的缓动效果，通过对时间参数`t`进行处理，返回相应的变形值。
 * 主要应用于渐入渐出的动画效果，使动画在开始和结束时缓慢，中间快速。
 *
 * @param t 当前时间，相对于开始时间的时间偏移量
 * @param b 开始值
 * @param c 变化量，即结束值减去开始值
 * @param d 动画的总时长
 * @returns 计算后的时间点对应的值
 */
export function easeInOutCubic(t: number, b: number, c: number, d: number) {
  // 计算变化量的差值，以便后续计算
  const cc = c - b
  // 调整时间参数，使其相对于整个动画时长的一半进行计算
  t /= d / 2
  // 如果当前时间在动画的前半段
  if (t < 1) {
    // 返回缓入效果的计算结果
    return (cc / 2) * t * t * t + b
  }
  // 如果当前时间在动画的后半段
  return (cc / 2) * ((t -= 2) * t * t + 2) + b
}
