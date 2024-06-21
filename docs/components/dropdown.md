---
title: Dropdown
description: Dropdown  组件的文档
---

# Dropdown 下拉菜单

将动作或菜单折叠到下拉菜单中。

## 基础用法

移动到下拉菜单上，展开更多操作。

<preview path="../demo/Dropdown/Basic.vue" title="基础用法" description="Dropdown组件的基础用法" />

## 触发方式

可以配置 click 或者 hover 触发下拉菜单。

<preview path="../demo/Dropdown/Trigger.vue" title="触发方式" description="Button组件的触发方式" />

## 菜单隐藏方式

可以hide-after-click属性来配置。

<preview path="../demo/Dropdown/Hide.vue" title="菜单隐藏方式" description="下拉菜单默认在点击菜单项后会被隐藏，将``hide-on-click``属性默认为``false``可以关闭此功能。" />

## Dropdown Attributes

| 参数             | 说明                                               | 类型         | 可选值                                               | 默认值       |
| ---------------- | -------------------------------------------------- | ------------ | ---------------------------------------------------- | ------------ |
| menu-options     | 下拉菜单选项                                       | MenuOption[] | —                                                    | —            |
| trigger          | 触发下拉的行为                                     | String       | hover / click                                        | hover        |
| placement        | 菜单弹出位置                                       | String       | top/top-start/top-end/bottom/bottom-start/bottom-end | bottom-start |
| open-delay       | 展开下拉菜单的延时（仅在 trigger 为 hover 时有效） | Number       | —                                                    | 250          |
| close-delay      | 收起下拉菜单的延时（仅在 trigger 为 hover 时有效） | Number       | —                                                    | 150          |
| hide-after-click | 是否在点击菜单项后隐藏菜单                         | Boolean      | —                                                    | true         |

## Dropdown Events

| 事件名称       | 说明                  | 回调参数          |
| -------------- | --------------------- | ----------------- |
| select         | 点击菜单项触发的事件  | event: MenuOption |
| visible-change | 下拉框出现/隐藏时触发 | visible: boolean  |

## Dropdown Slot

| 名称 | 说明               |
| ---- | ------------------ |
| —    | 触发下拉列表的内容 |

## Dropdown MenuOption Attributes

| 参数     | 说明                             | 类型    | 可选值 | 默认值 |
| -------- | -------------------------------- | ------- | ------ | ------ |
| label    | 菜单项文字                       | String  | —      | —      |
| key      | 菜单项的索引值，默认为数组索引值 | Number  | —      | —      |
| disabled | 是否禁用菜单项                   | Boolean | —      | false  |
| divided  | 是否显示分隔线                   | Boolean | —      | false  |
