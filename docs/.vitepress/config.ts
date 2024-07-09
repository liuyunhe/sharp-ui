import { defineConfig } from 'vitepress'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { fileURLToPath, URL } from 'node:url'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'SharpUI',
  base: '/sharp-ui/',
  description: 'A Vue 3 UI Library',
  // srcDir: 'components',
  head: [['link', { rel: 'icon', href: '/sharp-ui/assets/logo.svg' }]],
  markdown: {
    // 配置Markdown处理的插件。
    // 该函数无返回值。
    // md Markdown处理实例，用于链式调用插件。
    config(md) {
      // 使用containerPreview和componentPreview插件增强Markdown功能
      md.use(containerPreview)
      md.use(componentPreview)
    }
  },
  vite: {
    plugins: [vueJsx()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../src', import.meta.url))
      }
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: {
      src: '/assets/logo.svg',
      alt: 'SharpUI'
    },
    search: {
      provider: 'local'
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/design' },
      { text: '快速开始', link: '/guide/quickstart' }
    ],
    sidebar: [
      {
        text: '开发指南',
        collapsed: false,
        items: [
          { text: '简介', link: '/guide/introduce' },
          { text: '设计原则', link: '/guide/design' },
          { text: '快速开始', link: '/guide/quickstart' }
        ]
      },
      {
        text: '组件',
        collapsed: false,
        items: [
          {
            text: 'Basic',
            items: [
              { text: 'Layout 布局', link: '/components/layout' },
              { text: 'Container 布局容器', link: '/components/container' },
              { text: 'Color 色彩', link: '/components/color' },
              { text: 'Border 边框', link: '/components/border' },
              { text: 'Button 按钮', link: '/components/button' },
              { text: 'Icon 图标', link: '/components/icon' },
              { text: 'Link 文字链接', link: '/components/link' }
            ]
          },
          {
            text: 'Form',
            items: [
              { text: 'Checkbox 多选框', link: '/components/checkbox' },
              { text: 'Input 输入框', link: '/components/input' },
              { text: 'InputNumber 数字输入框', link: '/components/inputnumber' },
              { text: 'Select 选择器', link: '/components/select' },
              { text: 'Switch 开关', link: '/components/switch' },
              { text: 'Form 表单', link: '/components/form' }
            ]
          },
          {
            text: 'Notice',
            items: [
              { text: 'Alert 警告', link: '/components/alert' },
              { text: 'Message 消息提示', link: '/components/message' },
              { text: 'MessageBox 消息弹框', link: '/components/messagebox' }
            ]
          },
          {
            text: 'Navigation',
            items: [{ text: 'Dropdown 下拉菜单', link: '/components/dropdown' }]
          },
          {
            text: 'Others',
            items: [{ text: 'Collapse 折叠面板', link: '/components/collapse' }]
          }
        ]
      }
    ],
    outline: {
      // level: [2, 3],
      label: '页面导航'
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present liuyunhe'
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/liuyunhe/sharp-ui' }]
  }
})
