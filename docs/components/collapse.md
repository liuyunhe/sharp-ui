---
title: Collapse
description: Collapse 组件的文档
---

# Collapse

通过折叠面板收纳内容区域

## 基本用法

可同时展开多个面板，面板之间不影响

<preview path="../demo/Collapse/Basic.vue" title="基础用法" />

## 手风琴效果

每次只能展开一个面板

<preview path="../demo/Collapse/Accordion.vue" title="手风琴效果" />

## 自定义面板标题

除了可以通过 title 属性以外，还可以通过具名 slot 来实现自定义面板的标题内容，以实现增加图标等效果。

<preview path="../demo/Collapse/Slot.vue" title="自定义面板标题" />

## Collapse Attributes

| 参数      | 说明                                     | 类型      | 可选值                             | 默认值 |
|------------|----------------------------------------|------------|------------------------------------|--------|
| accordion | 是否手风琴模式                                | boolean   | —                                  | false  |
| value      | 当前展开的面板，可以使用 v-model 双向绑定数据 | array      | —                                  | —       |

## Collapse Events

| 事件名称 | 说明                                       | 回调参数 |
|----------|--------------------------------------------|------------|
| change    | 当前展开的面板改变时触发（使用 v-model 时必用） | 展开的面板 key 值 |

## Collapse Item Attributes

| 参数      | 说明                                     | 类型      | 可选值                             | 默认值 |
|------------|----------------------------------------|------------|------------------------------------|--------|
| name       | 唯一标志符                                    | string     | —                                  | —       |
| title      | 面板标题                                    | string     | —                                  | —       |
| disabled    | 是否禁用面板                                  | boolean    | —                                  | false   |
| hide-arrow | 是否隐藏面板右上角箭头                                 | boolean    | —                                  | false   |

