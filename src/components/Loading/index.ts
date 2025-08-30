import { Loading } from './service'
import { vLoading } from './directive'

import type { App } from 'vue'

// installer and everything in all
export const SLoading = {
  install(app: App) {
    app.directive('loading', vLoading)
    app.config.globalProperties.$loading = Loading
  },
  directive: vLoading,
  service: Loading,
}

export default SLoading
export { vLoading, vLoading as SLoadingDirective, Loading as SLoadingService }

export * from './types'
