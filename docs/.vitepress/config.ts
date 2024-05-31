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
      { text: '快速开始', link: '/markdown-examples' },
      { text: '指南', link: '/api-examples' }
    ],
    sidebar: [
      {
        text: 'Examples1',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },
      {
        text: 'Basic',
        items: [
          { text: 'Alert', link: '/components/alert' },
          { text: 'Button', link: '/components/button' },
          { text: 'Input', link: '/components/input' },
          { text: 'Switch', link: '/components/switch' },
          { text: 'Select', link: '/components/select' },
          { text: 'Form', link: '/components/form' }
        ]
      }
    ],
    outline: {
      // level: [2, 3],
      label: '页面导航'
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present liuyunhe'
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/liuyunhe/sharp-ui' }]
  }
})
