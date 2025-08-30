import type { App } from 'vue'
import Col from '@/components/Col/Col.vue'

Col.install = (app: App) => {
  app.component(Col.name!, Col)
}

export default Col
export * from './types'
