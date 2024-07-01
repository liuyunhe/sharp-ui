export type AlertType = 'primary' | 'success' | 'warning' | 'danger' | 'info'

export interface AlertProps {
  content?: string
  type?: AlertType
  effect?: 'dark' | 'light'
  closeable?: boolean
  showIcon?: boolean
}

export interface AlertEvents {
  (e: 'close'): void
}

export interface AlertInstance {
  show: () => void
  hide: () => void
}
