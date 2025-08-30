import type { ComponentSize } from '@/constants'

/**
 * InputProps 定义了输入框组件的props
 * @typeParam type 输入框类型，如"text"、"number"等，默认为字符串类型
 * @typeParam modelValue 输入框的值，类型为字符串
 * @typeParam size 输入框大小，可选值为'large'或'small'，默认无大小设定
 * @typeParam disabled 是否禁用输入框，类型为布尔值，默认为false
 * @typeParam clearable 是否允许清空输入框的内容，类型为布尔值，默认为false
 * @typeParam showPassword 是否显示密码类型输入框，类型为布尔值，默认为false
 * @typeParam placeholder 输入框的占位文本，类型为字符串，默认无占位文本
 * @typeParam readonly 是否为只读状态，类型为布尔值，默认为false
 * @typeParam autocomplete 自动完成属性，控制浏览器自动完成功能，类型为字符串，默认无设定
 * @typeParam autofocus 是否自动获取焦点，类型为布尔值，默认为false
 * @typeParam form 输入框所属的表单的名称，类型为字符串，默认无设定
 */
export interface InputProps {
  type?: string // 输入框类型，如"text"、"number"等
  modelValue: string | number | null // 输入框的值
  size?: ComponentSize // 输入框大小，可选值为'large'或'small'
  disabled?: boolean // 是否禁用输入框
  clearable?: boolean // 是否允许清空输入框的内容
  showPassword?: boolean // 是否显示密码类型输入框
  placeholder?: string // 输入框的占位文本
  readonly?: boolean // 是否为只读状态
  autocomplete?: string // 自动完成属性，控制浏览器自动完成功能
  autofocus?: boolean // 是否自动获取焦点
  form?: string // 输入框所属的表单的名称
}

/**
 * InputEmits 定义了输入框组件的事件emit
 * @event update:modelValue 当modelValue更新时触发，用于更新父组件绑定的值。事件参数为新的值。
 * @event input 输入框值发生变化时触发。事件参数为新的值。
 * @event change 输入框失去焦点且值发生变化时触发。事件参数为新的值。
 * @event focus 输入框获得焦点时触发。事件参数为焦点事件。
 * @event blur 输入框失去焦点时触发。事件参数为焦点事件。
 * @event clear 输入框内容被清空时触发。无事件参数。
 */
export interface InputEmits {
  (e: 'update:modelValue', value: string): void // 当modelValue更新时触发，用于更新父组件绑定的值
  (e: 'input', value: string): void // 输入框值发生变化时触发
  (e: 'change', value: string): void // 输入框失去焦点且值发生变化时触发
  (e: 'focus', value: FocusEvent): void // 输入框获得焦点时触发
  (e: 'blur', value: FocusEvent): void // 输入框失去焦点时触发
  (e: 'clear'): void // 输入框内容被清空时触发
}

/**
 * InputInstance 定义了输入框组件的实例对象
 * @property ref 输入框的引用，可能是input或textarea元素。
 */
export interface InputInstance {
  ref: HTMLInputElement | HTMLTextAreaElement // 输入框的引用，可能是input或textarea元素
  input: HTMLInputElement | HTMLTextAreaElement // 输入框的引用，可能是input或textarea元素
  focus: () => Promise<void> // 使输入框获得焦点
  blur: () => void // 使输入框失去焦点
}
