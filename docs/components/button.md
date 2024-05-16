---
title: Button | V-Element
description: Button 组件的文档
---

# Button 按钮
常用的操作按钮。

## 基础用法
使用 `type`、`plain`、`round` 和 `circle` 来定义按钮的样式。

<preview path="../demo/Button/Basic.vue" title="基础用法" description="Button组件的基础用法" />

<preview path="../demo/Button/Round.vue" title="圆角" description="Button组件的圆角用法" />


## 禁用状态
按钮不可用状态。

<preview path="../demo/Button/Disabled.vue" title="禁用状态" description="Button组件的禁用状态" />


## 文字按钮
没有边框和背景色的按钮。

<preview path="../demo/Button/Text.vue" title="文字按钮" description="Button组件的文字按钮" />

## 图标按钮
带图标的按钮可增强辨识度（有文字）或节省空间（无文字）。

<preview path="../demo/Button/Icon.vue" title="图标按钮" description="Button组件的图标按钮" />


## 加载中
点击按钮后进行数据加载操作，在按钮上显示加载状态。

<preview path="../demo/Button/Loading.vue" title="加载中" description="Button组件的加载状态" />


## 不同尺寸
Button 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。

<preview path="../demo/Button/Size.vue" title="不同尺寸" description="Button组件的不同尺寸" />


## Button Attributes

| Name              | Description                                                             | Type                                                                            | Default |
| ----------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------- |
| size              | button size                                                             | `enum` - `'large'\| 'small'`                                                    | —       |
| type              | button type                                                             | `enum` - `'primary'\| 'success'\| 'warning'\| 'danger'\| 'info'`                | —       |
| plain             | determine whether it's a plain button                                   | `boolean`                                                                       | false   |
| round             | determine whether it's a round button                                   | `boolean`                                                                       | false   |
| circle            | determine whether it's a circle button                                  | `boolean`                                                                       | false   |
| loading           | determine whether it's loading                                          | `boolean`                                                                       | false   |
| disabled          | disable the button                                                      | `boolean`                                                                       | false   |
| icon              | icon component                                                          | `string`                                                                        | —       |
| autofocus         | same as native button's `autofocus`                                     | `boolean`                                                                       | false   |
| native-type       | same as native button's `type`                                          | `enum` - `'button'\| 'submit'\| 'reset'`                                        | button  |

