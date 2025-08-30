---
title: Alert
description: Alert 组件的文档
---

# Alert 警告

用于页面中展示重要的提示信息。

## 基础用法

页面中的非浮层元素，不会自动消失。
Alert 组件提供四种主题，由`type`属性指定，默认值为`info`。

<preview path="../demo/Alert/Basic.vue" title="基础用法" description="Alert组件的基础用法" />

## 主题

Alert 组件提供了两个不同的主题：`light`和`dark`。通过设置`effect`属性来改变主题，默认为`light`。

<preview path="../demo/Alert/Theme.vue" title="主题" description="Alert 组件提供了两个不同的主题：`light`和`dark`。" />

## 使用图标

你可以通过为 Alert 组件添加图标来提高可读性。

通过设置 ``show-icon`` 属性来显示 Alert 的 icon，这能更有效地向用户展示你的显示意图。

<preview path="../demo/Alert/Icon.vue" title="基础用法" description="Alert组件的基础用法" />

## Alert Attributes

| 参数        | 说明                               | 类型    | 可选值                     | 默认值 |
| ----------- | ---------------------------------- | ------- | -------------------------- | ------ |
| title       | 标题                               | `string`  | —                          | —      |
| type        | 主题                               | `string`  | success/warning/info/error | info   |
| effect      | 选择提供的主题                               | `string`  | light/dark                 | light  |
| description | 辅助性文字。也可通过默认 slot 传入 | `string`  | —                          | —      |
| closable    | 是否可关闭                         | `boolean` | —                          | true   |
| close-text  | 关闭按钮自定义文本                 | `string`  | —                          | —      |
| center      | 文字是否居中                       | `boolean` | —                          | false  |
| show-icon   | 是否显示图标                       | `boolean` | —                          | false  |
| close-text | 关闭按钮自定义文本                  | `string`  | —                          | —      |
| center      | 文字是否居中                       | `boolean` | —                          | false  |
