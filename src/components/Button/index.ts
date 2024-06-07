import type { App } from 'vue'
import Button from '@/components/Button/Button.vue'

Button.install = (app: App) => {
  app.component(Button.name!, Button)
}

export default Button
export * from './types'
