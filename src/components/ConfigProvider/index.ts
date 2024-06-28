import { withInstall } from '@/utils'

import ConfigProvider from './config-provider'

export const SConfigProvider = withInstall(ConfigProvider)
export default SConfigProvider

export * from './config-provider'
export * from './config-provider-props'
export * from './constants'
export * from './hooks/use-global-config'
