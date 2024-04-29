export type AlertType = 'primary' | 'success' | 'warning' | 'danger' | 'info'

export interface AlertProps {
  content?: string
  type?: AlertType
  effect?: 'dark' | 'light'
  closeable?: boolean
}

export interface AlertEvents {
  (e: 'close'): void
}

export interface AlertInstance {
  close: () => void
}
