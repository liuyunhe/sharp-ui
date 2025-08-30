---
title： 快速开始
---

# 快速开始

SharpUI 是使用最新的 Vue3.4 和 TS 打造的一套网站快速成型工具。本节将介绍如何在项目中使用 SharpUI

<div align=center>
  <img src="/assets/intro-1.svg" align="center" width="300" height="300">
</div>

## npm 安装

推荐使用 npm 的方式安装，它能更好地和 `vite` 打包工具配合使用。

```bash
npm install @shepardliu/sharp-ui -S
# or
yarn add @shepardliu/sharp-ui -S
# or
pnpm add @shepardliu/sharp-ui -S
```
  

## 引入

你可以引入整个 SharpUI，或是根据需要仅引入部分组件。我们先介绍如何引入完整的 SharpUI。

#### 完整引入

在 main.js 中写入以下内容：

```js
import { createApp } from 'vue'
import App from './App.vue'
import SharpUI from '@shepardliu/sharp-ui'
import '@shepardliu/sharp-ui/dist/index.css'

const app = createApp(App)
app.use(SharpUI)
app.mount('#app')
```

以上代码便完成了 SharpUI 的引入。需要注意的是，样式文件需要单独引入。

#### 按需引入

接下来，如果你只希望引入部分组件，比如 Button 和 Select，那么需要在 main.js 中写入以下内容：

```js
import { createApp } from 'vue'
import { Button, Select } from '@shepardliu/sharp-ui';
import App from './App.vue';

const app = createApp(App)
app.component(Button.name, Button);
app.component(Select.name, Select);
app.mount('#app')
```

## 开始使用

至此，一个基于 Vue 和 Element 的开发环境已经搭建完毕，现在就可以编写代码了。各个组件的使用方法请参阅它们各自的文档。

