/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const vueComponent: DefineComponent<{}, {}, any>
  export default vueComponent
}

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string
  readonly VITE_PUBLIC_PATH: string
  readonly VITE_TITLE: string
}