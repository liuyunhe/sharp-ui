import type { App } from 'vue'
import Alert from '@/components/Alert/Alert.vue'

Alert.install = (app: App) => {
  app.component(Alert.name!, Alert)
}

export default Alert
export * from './types'
