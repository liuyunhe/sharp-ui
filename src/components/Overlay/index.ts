import type { App } from 'vue'
import Overlay from './Overlay'

Overlay.install = (app: App) => {
  app.component(Overlay.name!, Overlay)
}

export default Overlay
export * from './Overlay'
