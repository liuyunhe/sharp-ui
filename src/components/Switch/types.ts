// 定义开关组件的值类型，可以是布尔、字符串或数字
export type SwitchValueType = boolean | string | number

// 定义开关组件的属性接口
export interface SwitchProps {
  modelValue: SwitchValueType // 组件的绑定值
  disabled?: boolean // 是否禁用
  activeText?: string // 开启状态的文本
  inactiveText?: string // 关闭状态的文本
  activeValue?: SwitchValueType // 开启状态的值
  inactiveValue?: SwitchValueType // 关闭状态的值
  name?: string // 输入框的名称
  id?: string // 输入框的id
  size?: 'small' | 'large' // 开关的大小
}

// 定义开关组件的事件接口
export interface SwitchEmits {
  (e: 'update:modelValue', value: SwitchValueType): void // 更新模型值的事件，emit('update:modelValue', value)
  (e: 'change', value: SwitchValueType): void // 状态改变的事件，emit('change', value)
}
