import { buildProps } from '@/utils'
import { radioPropsBase } from '.'
import type { ExtractPropTypes } from 'vue'
import type RadioButton from './radio-button.vue'

export const radioButtonProps = buildProps({
  ...radioPropsBase,
} as const)

export type RadioButtonProps = ExtractPropTypes<typeof radioButtonProps>
export type RadioButtonInstance = InstanceType<typeof RadioButton>
