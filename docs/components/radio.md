---
title: Radio
description: Radio 组件的文档
---

# Radio 单选框

在一组备选项中进行单选

## 基础用法

由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。

<preview path="../demo/Radio/Basic.vue" title="基础用法"></preview>

## 禁用状态

单选框不可用的状态。

<preview path="../demo/Radio/Disabled.vue" title="禁用状态"></preview>

## 单选框组

适用于在多个互斥的选项中选择的场景

<preview path="../demo/Radio/Group.vue" title="单选框组"></preview>

## 按钮样式

按钮样式的单选组合。

<preview path="../demo/Radio/Button.vue" title="按钮样式"></preview>

## 带有边框

设置`border`属性可以渲染为带有边框的单选框。

<preview path="../demo/Radio/Border.vue" title="按钮样式"></preview>

## API

### Radio Attributes

| 参数           | 说明           | 类型                      | 可选值                | 默认值 |
| -------------- | -------------- | ------------------------- | --------------------- | ------ |
| value/ v-model | 选中状态的值   | string / number / boolean | —                     | —      |
| label          | 选项的标识符   | string                    | —                     | —      |
| disabled       | 是否禁用       | boolean                   | —                     | false  |
| border         | 是否显示边框   | boolean                   | —                     | false  |
| size           | 单选框的尺寸   | string                    | medium / small / mini | —      |
| name           | 原生 name 属性 | string                    | —                     | —      |
| checked        | 当前是否选中   | boolean                   | —                     | false  |

### Radio Events

| 事件名称 | 说明                   | 回调参数              |
| -------- | ---------------------- | --------------------- |
| input    | 绑定值变化时触发的事件 | 选中的 Radio label 值 |

### Radio-group Attributes

| 参数           | 说明                                    | 类型                      | 可选值                | 默认值  |
| -------------- | --------------------------------------- | ------------------------- | --------------------- | ------- |
| value/ v-model | 选中项的绑定值                          | string / number / boolean | —                     | —       |
| size           | 单选框的尺寸                            | string                    | medium / small / mini | —       |
| disabled       | 是否禁用                                | boolean                   | —                     | false   |
| text-color     | 按钮形式的 Radio 激活时的文本颜色       | string                    | —                     | #ffffff |
| fill           | 按钮形式的 Radio 激活时的填充色和边框色 | string                    | —                     | #409EFF |

### Radio-group Events

| 事件名称 | 说明                   | 回调参数              |
| -------- | ---------------------- | --------------------- |
| input    | 绑定值变化时触发的事件 | 选中的 Radio label 值 |

### Radio-button Attributes

| 参数     | 说明           | 类型    | 可选值 | 默认值 |
| -------- | -------------- | ------- | ------ | ------ |
| label    | Radio 的 value | string  | —      | —      |
| disabled | 是否禁用       | boolean | —      | false  |
| name     | 原生 name 属性 | string  | —      | —      |
