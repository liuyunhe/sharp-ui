import type { ExtractPropTypes } from 'vue'
import type Col from './Col.vue'

export type ColSizeObject = {
  span?: number
  offset?: number
  pull?: number
  push?: number
}
export type ColSize = number | ColSizeObject

export interface ColProps {
  tag?: string
  span?: number
  offset?: number
  pull?: number
  push?: number
  xs?: ColSize
  sm?: ColSize
  md?: ColSize
  lg?: ColSize
  xl?: ColSize
}
export type ColInstance = InstanceType<typeof Col>
