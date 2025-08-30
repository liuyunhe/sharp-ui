import type { ExtractPropTypes, PropType } from 'vue'
import type Button from './Button.vue'
export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type ButtonSize = 'large' | 'small'
export type NativeType = 'button' | 'submit' | 'reset'

export interface ButtonProps {
  type?: ButtonType
  size?: ButtonSize
  plain?: boolean
  round?: boolean
  circle?: boolean
  disabled?: boolean
  /**
   * 按钮原始属性
   */
  nativeType?: NativeType
  autofocus?: boolean
  icon?: string
  loading?: boolean
}
export interface ButtonRefInstance {
  ref: HTMLButtonElement
}
export const buttonProps = {
  type: {
    type: String as PropType<ButtonType>
  },
  size: {
    type: String as PropType<ButtonSize>
  },
  plain: {
    type: Boolean
  },
  round: {
    type: Boolean
  },
  circle: {
    type: Boolean
  },
  disabled: {
    type: Boolean
  }
}

export type ButtonInstance = ExtractPropTypes<typeof Button> & ButtonRefInstance

export interface ButtonConfigContext {
  autoInsertSpace?: boolean
}
