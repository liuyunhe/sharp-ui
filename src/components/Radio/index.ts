import { withInstall, withNoopInstall } from '@/utils'

import Radio from './radio.vue'
import RadioButton from './radio-button.vue'
import RadioGroup from './radio-group.vue'

export const SRadio = withInstall(Radio, {
  RadioButton,
  RadioGroup,
})
export default SRadio
export const SRadioGroup = withNoopInstall(RadioGroup)
export const SRadioButton = withNoopInstall(RadioButton)

export * from './radio'
export * from './radio-group'
export * from './radio-button'
export * from './constants'
