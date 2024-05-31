---
title: Switch
description: Switch 组件的文档
---

# Switch 开关

表示两种相互对立的状态间的切换，多用于触发「开/关」。

## 基础用法

绑定 v-model 到一个 Boolean 类型的变量。 可以使用 **--s-switch-on-color** 属性与 **--s-switch-off-color** 属性来设置开关的背景色。

<preview path="../demo/Switch/Basic.vue" title="基础Switch" description="Switch 基础用例"></preview>

## 禁用状态

设置 **disabled** 属性，接受一个 boolean，设置true即可禁用。

<preview path="../demo/Switch/Disabled.vue" title="Switch 禁用状态" description="Switch 禁用状态"></preview>

## 不同尺寸

设置 **size** 属性，接受**large / small**，呈现不同的尺寸。

<preview path="../demo/Switch/Size.vue" title="Switch 不同尺寸" description="Switch 不同尺寸"></preview>

## 支持自定义 value 类型

你可以设置 **active-value** 和 **inactive-value** 属性， 它们接受 boolean | string | number 类型的值。
<preview path="../demo/Switch/CustomValue.vue" title="支持自定义 value 类型" description="Switch 支持自定义 value 类型"></preview>

## 文字描述

使用 **active-text** 属性与 **inactive-text** 属性来设置开关的文字描述。

<preview path="../demo/Switch/Text.vue" title="支持文字描述" description="Switch 文字描述"></preview>

## Switch Attributes

| 参数                                         | 说明                                                    | 类型                      | 可选值                | 默认值  |
| -------------------------------------------- | ------------------------------------------------------- | ------------------------- | --------------------- | ------- |
| v-model / value                              | 绑定值                                                  | boolean                   | —                     | false   |
| disabled&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; | 是否禁用                                                | boolean                   | —                     | false   |
| size                                         | 开关大小，可选值为`large`、`small`、`default`或者不设置 | string                    | large, small, default | —       |
| active-text                                  | 打开时的文字描述                                        | string                    | —                     | —       |
| inactive-text                                | 关闭时的文字描述                                        | string                    | —                     | —       |
| active-color                                 | 打开时的背景色                                          | string                    | —                     | #409EFF |
| inactive-color                               | 关闭时的背景色                                          | string                    | —                     | #C0CCDA |
| active-value                                 | 打开时的值                                              | boolean / string / number | —                     | true    |
| inactive-value                               | 关闭时的值                                              | boolean / string / number | —                     | false   |
| name                                         | 原生 `name` 属性                                        | string                    | —                     | —       |
| validate-event                               | 输入时是否触发表单的校验                                | boolean                   | —                     | true    |

## Switch Events

| 事件名称                                    | 说明                                                                                      | 回调参数                 |
| ------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------ |
| change &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;  | 开关状态发生变化时的回调函数 &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; | 当前状态的值&emsp;&emsp; |
