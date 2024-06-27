---
title: Container 布局容器
description: Container 的文档
---

# Container 布局容器

用于布局的容器组件，方便快速搭建页面的基本结构：

`<s-container>`：外层容器。当子元素中包含 `<s-header>` 或 `<s-footer>` 时，全部子元素会垂直上下排列，否则会水平左右排列。

`<s-header>`：顶栏容器。

`<s-aside>`：侧边栏容器。

`<s-main>`：主要区域容器。

`<s-footer>`：底栏容器。

::: tip
 以上组件采用了 flex 布局，使用前请确定目标浏览器是否兼容。此外， `<s-container>` 的子元素只能是后四者，后四者的父元素也只能是 `<s-container>`。
:::

## 常见页面布局

<preview path="../demo/Container/Basic.vue" title="常见页面布局" />

## Container API

### Container Attributes

| 参数      | 说明             | 类型   | 可选值                | 默认值                                                                 |
| --------- | ---------------- | ------ | --------------------- | ---------------------------------------------------------------------- | 
| direction | 子元素的排列方向 | string | horizontal / vertical | 子元素中有 `s-header` 或 `s-footer` 时为 vertical，否则为 horizontal | 

### Container Slots

| 插槽名  | 说明           | 子标签                                     |
| ------- | -------------- | ------------------------------------------ |
| default | 自定义默认内容 | Container / Header / Aside / Main / Footer |

## Header API

### Header Attributes

| 参数   | 说明     | 类型   | 可选值 | 默认值 |
| ------ | -------- | ------ | ------ | ------ |
| height | 顶栏高度 | string | —      | 60px   |

### Header Slots

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 自定义默认内容 |

## Aside API

### Aside Attributes

| 参数  | 说明       | 类型   | 可选值 | 默认值 |
| ----- | ---------- | ------ | ------ | ------ |
| width | 侧边栏宽度 | string | —      | 300px  |

### Aside Slots

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 自定义默认内容 |

## Main API

### Main Attributes

| 参数   | 说明     | 类型   | 可选值 | 默认值 |
| ------ | -------- | ------ | ------ | ------ |
| height | 底栏高度 | string | —      | 100px  |

### Main Slots

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 自定义默认内容 |

## Footer API

### Footer Attributes

| 参数   | 说明     | 类型   | 可选值 | 默认值 |
| ------ | -------- | ------ | ------ | ------ |
| height | 底栏高度 | string | —      | 60px   |

### Footer Slots

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 自定义默认内容 |
