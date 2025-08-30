import DefaultTheme from "vitepress/theme";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import {
  AntDesignContainer,
  ElementPlusContainer,
  NaiveUIContainer
} from '@vitepress-demo-preview/component'

import '@vitepress-demo-preview/component/dist/style.css'
import './custom.css'
import '../../../src/styles/index.css'

library.add(fas)

/**
 * 该函数扩展并增强了默认的主题配置。
 * 它通过引入自定义组件来修改应用的构建方式。
 * 
 * @param {Object} app - vitepress 应用实例，用于注册组件和配置应用。
 * @returns {Object} 返回扩展后的主题配置对象。
 */
export default {
  ...DefaultTheme, // 扩展默认主题配置
  enhanceApp({ app }) {
    // 注册 'demo-preview' 组件到 vitepress 应用
    app.component('demo-preview', ElementPlusContainer)
  }
}