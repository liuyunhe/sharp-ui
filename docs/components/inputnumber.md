---
title: Input Number
description: Input Number 组件的文档
---

# Input Number 数字输入框

仅允许输入标准的数字值，可定义范围

## 基础用法

要使用它，只需要在 `<s-input-number>` 元素中使用 v-model 绑定变量即可，变量的初始值即为默认值。

<preview path="../demo/InputNumber/Basic.vue" title="基础用法"></preview>

::: tip
当输入无效的字符串到输入框时，由于错误，输入值将把 NaN 导入到上层
:::

## 禁用状态

disabled属性接受一个 `Boolean`，设置为true即可禁用整个组件。 ，如果你只需要控制数值在某一范围内，可以设置 min 属性和 max 属性， 默认最小值为 0。

<preview path="../demo/InputNumber/Disabled.vue" title="禁用状态"></preview>

## 步进

允许定义递增递减的步进控制

设置 `step` 属性可以控制步长。

<preview path="../demo/InputNumber/Step.vue" title="步进"></preview>

## 严格步进

`step-strictly`属性接受一个`Boolean`。 如果这个属性被设置为 `true`，则只能输入步进的倍数。

<preview path="../demo/InputNumber/StepStrictly.vue" title="严格步进"></preview>

## 精度

设置 precision 属性可以控制数值精度，接收一个 Number。

<preview path="../demo/InputNumber/Precision.vue" title="精度" ></preview>

::: tip
`precision` 的值必须是一个非负整数，并且不能小于 `step` 的小数位数。
:::

## 不同的输入框尺寸

使用 `size` 属性额外配置尺寸，可选的尺寸大小为：`large` 或 `small`

<preview path="../demo/InputNumber/Size.vue" title="不同的输入框尺寸" ></preview>

## 按钮位置

设置 `controls-position` 属性可以控制按钮位置。

<preview path="../demo/InputNumber/Position.vue" title="按钮位置" ></preview>

## API

### Attributes

| Name                        | Description                                      | Type                                          | Default   |
| --------------------------- | ------------------------------------------------ | --------------------------------------------- | --------- |
| model-value / v-model       | binding value                                    | number                                       | —         |
| min                         | the minimum allowed value                        | number                                       | -Infinity |
| max                         | the maximum allowed value                        | number                                       | Infinity  |
| step                        | incremental step                                 | number                                       | 1         |
| step-strictly               | whether input value can only be multiple of step | boolean                                      | false     |
| precision                   | precision of input value                         | number                                       | —         |
| size                        | size of the component                            | enum  `'large' \| 'default' \| 'small'`      | default   |
| readonly ^(2.2.16)          | same as `readonly` in native input               | boolean                                      | false     |
| disabled                    | whether the component is disabled                | boolean                                      | false     |
| controls                    | whether to enable the control buttons            | boolean                                      | true      |
| controls-position           | position of the control buttons                  | enum  `'' \| 'right'`                        | —         |
| name                        | same as `name` in native input                   | string                                       | —         |
| label ^(a11y) ^(deprecated) | same as `aria-label` in native input             | string                                       | —         |
| aria-label ^(a11y) ^(2.7.2) | same as `aria-label` in native input             | string                                       | —         |
| placeholder                 | same as `placeholder` in native input            | string                                       | —         |
| id                          | same as `id` in native input                     | string                                       | —         |
| value-on-clear ^(2.2.0)     | value should be set when input box is cleared    | number   / null   / enum  `'min' \| 'max'` | —         |
| validate-event              | whether to trigger form validation               | boolean                                      | true      |

### Slots

| Name                   | Description                           |
| ---------------------- | ------------------------------------- |
| decrease-icon ^(2.6.3) | custom input box button decrease icon |
| increase-icon ^(2.6.3) | custom input box button increase icon |

### Events

| Name   | Description                     | Type                                                                                    |
| ------ | ------------------------------- | --------------------------------------------------------------------------------------- |
| change | triggers when the value changes | Function  `(currentValue: number \| undefined, oldValue: number \| undefined) => void` |
| blur   | triggers when Input blurs       | Function  `(event: FocusEvent) => void`                                                |
| focus  | triggers when Input focuses     | Function  `(event: FocusEvent) => void`                                                |

### Exposes

| Name  | Description                      | Type                    |
| ----- | -------------------------------- | ----------------------- |
| focus | get focus the input component    | Function  `() => void` |
| blur  | remove focus the input component | Function  `() => void` |
