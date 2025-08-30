import type { App } from 'vue'
import Row from '@/components/Row/Row.vue'

Row.install = (app: App) => {
  app.component(Row.name!, Row)
}

export default Row

export * from './types'
