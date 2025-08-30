/**
 * 导入Row组件的类型定义，用于后续的类型引用。
 * @module Row
 */
import type Row from './Row.vue'

/**
 * 定义了Row组件水平排列的对齐方式选项。
 * 这些选项提供了多种布局灵活性，以满足不同的设计需求。
 * @enum {string}
 */
export const RowJustify = [
  'start',
  'center',
  'end',
  'space-around',
  'space-between',
  'space-evenly'
] as const

/**
 * 定义了Row组件垂直排列的对齐方式选项。
 * 这些选项帮助调整元素在垂直方向上的布局，提供更好的视觉效果。
 * @enum {string}
 */
export const RowAlign = ['top', 'middle', 'bottom'] as const

/**
 * Row组件的属性接口。
 * 该接口定义了Row组件可接受的配置项，用于控制布局和样式。
 */
export interface RowProps {
  /**
   * 自定义Row组件的HTML标签。
   * 通过此属性，可以将Row渲染为任何HTML元素，增加布局的灵活性。
   */
  tag?: string
  /**
   * 栅格间隔。
   * 用于设置Row内子元素之间的间距，以实现更细致的布局控制。
   */
  gutter?: number
  /**
   * 水平排列方式。
   * 取值来自RowJustify枚举，用于定义子元素在水平方向上的对齐方式。
   */
  justify?: (typeof RowJustify)[number]
  /**
   * 垂直排列方式。
   * 取值来自RowAlign枚举，用于定义子元素在垂直方向上的对齐方式。
   */
  align?: (typeof RowAlign)[number]
}

/**
 * Row组件的实例类型。
 * 用于类型检查和约束Row组件的实例化对象，确保其符合预期的结构和行为。
 */
export type RowInstance = InstanceType<typeof Row>
