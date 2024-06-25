import type { App } from 'vue'
import Link from '@/components/Link/Link.vue'

Link.install = (app: App) => {
  app.component(Link.name!, Link)
}

export default Link
export * from './types'
