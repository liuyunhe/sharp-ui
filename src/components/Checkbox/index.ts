import { withInstall, withNoopInstall } from '@/utils'

import Checkbox from './checkbox.vue'
import CheckboxButton from './checkbox-button.vue'
import CheckboxGroup from './checkbox-group.vue'

export const SCheckbox = withInstall(Checkbox, {
  CheckboxButton,
  CheckboxGroup,
})
export default SCheckbox

export const SCheckboxButton = withNoopInstall(CheckboxButton)
export const SCheckboxGroup = withNoopInstall(CheckboxGroup)

export * from './checkbox-group'
export * from './checkbox'
export * from './constants'
