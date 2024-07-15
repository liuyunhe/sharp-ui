import { isClient, isIOS } from '@vueuse/core'
/**
 * 检查当前环境是否为Firefox浏览器。
 * 
 * 该函数通过检测navigator.userAgent属性来确定当前浏览器是否为Firefox。
 * 它首先确认当前环境是在客户端（而不是服务器），然后使用正则表达式匹配userAgent来寻找Firefox的迹象。
 * 这种检查方式对于识别特定浏览器很有用，特别是在需要针对不同浏览器实现不同逻辑的场景中。
 * 
 * @returns {boolean} 如果当前浏览器是Firefox，则返回true；否则返回false。
 */
export const isFirefox = (): boolean =>
  isClient && /firefox/i.test(window.navigator.userAgent)

export { isClient, isIOS }
