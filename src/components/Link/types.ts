import type Link from './Link.vue'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
export interface LinkProps {
  type?: 'primary' | 'success' | 'warning' | 'info' | 'danger' | 'default'
  underline?: boolean
  disabled?: boolean
  href?: string
  target?: '_blank' | '_parent' | '_self' | '_top' | string
  icon?: object | Array<string> | string | IconDefinition
}

export const linkEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent
}
export type LinkEmits = typeof linkEmits

export type LinkInstance = InstanceType<typeof Link>
