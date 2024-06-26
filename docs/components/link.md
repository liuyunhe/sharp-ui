---
title: Link 文字链接
description: Link  组件的文档
---

# Link 文字链接

文字超链接

## 基础用法

基础的文字链接用法。

<preview path="../demo/Link/Basic.vue" title="基础用法"></preview>

## 禁用状态

文字链接不可用状态。

<preview path="../demo/Link/Disabled.vue" title="禁用状态"></preview>

## 下划线

文字链接下划线。

<preview path="../demo/Link/UnderLine.vue" title="下划线"></preview>

## 图标

带图标的文字链接可增强辨识度。

<preview path="../demo/Link/Icon.vue" title="图标"></preview>

## Link Attributes

| 参数      | 说明           | 类型    | 可选值                                      | 默认值 |
| --------- | -------------- | ------- | ------------------------------------------- | ------ |
| type      | 类型           | string  | ``primary`` / ``success`` / ``warning`` / ``danger`` / ``info`` | —      |
| disabled  | 是否禁用状态   | boolean | —                                           | false  |
| underline | 是否下划线     | boolean | —                                           | true   |
| icon      | 图标类名       | string  | —                                           | -      |
| target    | 打开链接的方式 | string  | ``_blank``/``_self``/``_parent``/``_top``              | \_self |
| href      | 链接地址       | string  | —                                           | -      |
