---
title: Checkbox 
description: Checkbox  组件的文档
---

# Checkbox 多选框

::: warning
``label`` 作为 ``value`` 来使用已经被 废弃, 建议``label`` 只用来表示展示的文字，这个被废弃的用法将会在 ``3.0.0`` 版本被移除，请考虑使用新 API 替换.
新 API ``value`` 在``2.6.0`` 中已经可用，您可以使用 ``value`` API 来设置复选框的值。
:::

在一组备选项中进行多选。

## 基础用法

单独使用可以表示两种状态之间的切换，写在标签中的内容为 checkbox 按钮后的介绍。

``checkbox-group``元素能把多个 ``checkbox`` 管理为一组，只需要在 Group 中使用 ``v-model`` 绑定 Array 类型的变量即可。 只有一个选项时的默认值类型为 ``Boolean``，当选中时值为true。 ``s-checkbox`` 标签中的内容将成为复选框按钮之后的描述。

<preview path="../demo/Checkbox/Basic.vue" title="基础用法" />

## 禁用状态

多选框不可用状态。

设置 ``disabled`` 属性即可。

<preview path="../demo/Checkbox/Disabled.vue" title="禁用状态" />

## 多选框组

适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。

在 ``s-checkbox`` 元素中定义 ``v-model`` 绑定变量，单一的 ``checkbox`` 中，默认绑定变量的值会是 ``Boolean``，选中为 true。 在 ``s-checkbox`` 组件中，``value`` 是选择框的值。 如果该组件下没有被传入内容，那么 ``label`` 将会作为 ``checkbox`` 按钮后的介绍。 ``value`` 也与数组中的元素值相对应。 如果指定的值存在于数组中，就处于选择状态，反之亦然。

<preview path="../demo/Checkbox/Group.vue" title="多选框组" />

## 中间状态

indeterminate 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果

<preview path="../demo/Checkbox/Indeterminate.vue" title="中间状态" />

## 可选项目数量的限制

使用 ``min`` 和 ``max`` 属性能够限制可以被勾选的项目的数量。

<preview path="../demo/Checkbox/Limit.vue" title="可选项数量限制" />

## 按钮样式

按钮样式的多选组合。

只需要把 ``s-checkbox`` 元素替换为 ``s-checkbox-button`` 元素即可。 此外，``sharp-ui`` 还提供了``size``属性。

<preview path="../demo/Checkbox/Button.vue" title="按钮样式" />

## 带有边框

设置border属性可以渲染为带有边框的多选框。

<preview path="../demo/Checkbox/Border.vue" title="带有边框" />

## Checkbox API

### Checkbox Attributes

| Name                           | Description                                                                                                                                                    | Type                                           | Default |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | ------- |
| model-value / v-model          | binding value                                                                                                                                                  | string   / number   / boolean               | —       |
| value ^(2.6.0)                 | value of the Checkbox when used inside a `checkbox-group`                                                                                                      | string   / number   / boolean   / object   | —       |
| label                          | label of the Checkbox when used inside a `checkbox-group`. If there's no value, `label` will act as `value`                                                    | string   / number   / boolean   / object   | —       |
| true-value ^(2.6.0)            | value of the Checkbox if it's checked                                                                                                                          | string   / number                            | —       |
| false-value ^(2.6.0)           | value of the Checkbox if it's not checked                                                                                                                      | string   / number                            | —       |
| true-label ^(deprecated)       | value of the Checkbox if it's checked                                                                                                                          | string   / number                            | —       |
| false-label ^(deprecated)      | value of the Checkbox if it's not checked                                                                                                                      | string   / number                            | —       |
| disabled                       | whether the Checkbox is disabled                                                                                                                               | boolean                                       | false   |
| border                         | whether to add a border around Checkbox                                                                                                                        | boolean                                       | false   |
| size                           | size of the Checkbox                                                                                                                                           | enum  `'large' \| 'default' \| 'small'`       | —       |
| name                           | native 'name' attribute                                                                                                                                        | string                                        | —       |
| checked                        | if the Checkbox is checked                                                                                                                                     | boolean                                       | false   |
| indeterminate                  | Set indeterminate state, only responsible for style control                                                                                                    | boolean                                       | false   |
| validate-event                 | whether to trigger form validation                                                                                                                             | boolean                                       | true    |
| tabindex                       | input tabindex                                                                                                                                                 | string   / number                            | —       |
| id                             | input id                                                                                                                                                       | string                                        | —       |
| controls ^(a11y) ^(deprecated) | same as [aria-controls]  (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls), takes effect when `indeterminate` is `true` | string                                        | —       |
| aria-controls ^(a11y) ^(2.7.2) | same as [aria-controls]  (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls), takes effect when `indeterminate` is `true` | string                                        | —       |

### Checkbox Events

| Name   | Description                             | Type                                                      |
| ------ | --------------------------------------- | --------------------------------------------------------- |
| change | triggers when the binding value changes | Function  `(value: string \| number \| boolean) => void` |

### Checkbox Slots

| Name    | Description               |
| ------- | ------------------------- |
| default | customize default content |

## CheckboxGroup API

### CheckboxGroup Attributes

| Name                        | Description                                       | Type                                     | Default |
| --------------------------- | ------------------------------------------------- | ---------------------------------------- | ------- |
| model-value / v-model       | binding value                                     | object  `string[]   \| number[]  `          | [        |
| size                        | size of checkbox                                  | enum  `'large' \| 'default' \| 'small'` | —       |
| disabled                    | whether the nesting checkboxes are disabled       | boolean                                 | false   |
| min                         | minimum number of checkbox checked                | number                                  | —       |
| max                         | maximum number of checkbox checked                | number                                  | —       |
| label ^(a11y) ^(deprecated) | native `aria-label` attribute                     | string                                  | —       |
| aria-label ^(a11y) ^(2.7.2) | native `aria-label` attribute                     | string                                  | —       |
| text-color                  | font color when button is active                  | string                                  | #ffffff |
| fill                        | border and background color when button is active | string                                  | #409eff |
| tag                         | element tag of the checkbox group                 | string                                  | div     |
| validate-event              | whether to trigger form validation                | boolean                                 | true    |

### CheckboxGroup Events

| Name   | Description                             | Type                                               |
| ------ | --------------------------------------- | -------------------------------------------------- |
| change | triggers when the binding value changes | Function  `(value: string[]   \| number[]  ) => void` |

### CheckboxGroup Slots

| Name    | Description               | Subtags                    |
| ------- | ------------------------- | -------------------------- |
| default | customize default content | Checkbox / Checkbox-button |

## CheckboxButton API

### CheckboxButton Attributes

| Name                      | Description                                                                                                 | Type                                           | Default |
| ------------------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | ------- |
| value ^(2.6.0)            | value of the checkbox when used inside a `checkbox-group`                                                   | string   / number   / boolean   / object   | —       |
| label                     | label of the checkbox when used inside a `checkbox-group`. If there's no value, `label` will act as `value` | string   / number   / boolean   / object   | —       |
| true-value ^(2.6.0)       | value of the checkbox if it's checked                                                                       | string   / number                            | —       |
| false-value ^(2.6.0)      | value of the checkbox if it's not checked                                                                   | string   / number                            | —       |
| true-label ^(deprecated)  | value of the checkbox if it's checked                                                                       | string   / number                            | —       |
| false-label ^(deprecated) | value of the checkbox if it's not checked                                                                   | string   / number                            | —       |
| disabled                  | whether the checkbox is disabled                                                                            | boolean                                       | false   |
| name                      | native 'name' attribute                                                                                     | string                                        | —       |
| checked                   | if the checkbox is checked                                                                                  | boolean                                       | false   |

### CheckboxButton Slots

| Name    | Description               |
| ------- | ------------------------- |
| default | customize default content |
