---
title: Form
description: Form 组件的文档
---

# Form 表单

表单包含 `输入框`, `单选框`, `下拉选择`, `多选框` 等用户输入的组件。 
使用表单，您可以收集、验证和提交数据。

## 典型表单

最基础的表单包括各种输入表单项，比如input、select、radio、checkbox等。

在每一个 form 组件中，你需要一个 form-item 字段作为输入项的容器，用于获取值与验证值。

<preview path="../demo/Form/Basic.vue" title="典型表单" description="Form 典型表单"></preview>

## Form Attributes

| 参数      | 说明          | 类型      | 可选值       | 默认值   |
|---------- |-------------- |---------- |-------------  |-------- |
| model      | 表单数据对象 | object    |                |                |
| rules      | 表单验证规则 | object    |                |                |
| label-width | 表单域标签的宽度 | string    |                |                |
| label-position | 表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width | string    | left/right/top | top |
| hide-required-asterisk | 是否显示必填字段的标签旁边的红色星 | boolean    |                | false |
| show-message | 是否显示校验错误信息 | boolean    |                | true |
| inline | 行内表单模式 | boolean    |                | false |
| disabled | 是否禁用该表单内的所有组件。若设置为 true，则表单内组件上的 disabled 属性不再生效 | boolean    |                | false |
| validate-on-rule-change | 是否在 rules 属性改变后立即触发一次验证 | boolean    |                | true |

## Form Methods

| 方法名      | 说明          | 参数      |
|---------- |-------------- |---------- |
| validate   | 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise | Function(callback: Function(boolean, object)) |
| validateField | 对部分表单字段进行校验的方法 | Function(props: array \| string, callback: Function(errorMessage: string)) |
| resetFields | 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果 | - |
| clearValidate | 移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果 | Function(props: array \| string) |

## Form Events

| 事件名称      | 说明          | 回调参数      |
|---------- |-------------- |---------- |
| validate   | 任一表单项被校验后触发 | 被校验的表单项 prop 值，校验是否通过，错误消息（如果存在） |

## Form-Item Attributes

| 参数      | 说明          | 类型      | 可选值       | 默认值   |
|---------- |-------------- |---------- |-------------  |-------- |
| prop      | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 | string    |                |                |
| label      | 标签文本 | string    |                |                |
| label-width | 表单域标签的的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。 | string    |                |                |
| required    | 是否必填，如不设置，则会根据校验规则自动生成 | boolean    |                |                |
| rules      | 表单验证规则 | object    |                |                |
| error      | 表单域验证错误信息, 设置该值会使表单验证状态变为error，并显示该错误信息 | string    |                |                |
| show-message | 是否显示校验错误信息 | boolean    |                | true |
| inline-message | 以行内形式展示校验信息 | boolean    |                | false |
| size       | 用于控制该表单内组件的尺寸 | string    | medium / small / mini | - |

## Form-Item Slot

| name      | 说明          |
|---------- |-------------- |
| -      | Form Item 的内容 |

## Form-Item Scoped Slot

| name      | 说明          |
|---------- |-------------- |
| error     | 自定义表单校验信息的显示方式，参数为 { error } |

## Form-Item Methods

| 方法名      | 说明          | 参数      |
|---------- |-------------- |---------- |
| resetField | 对该表单项进行重置，将其值重置为初始值并移除校验结果 | - |
| clearValidate | 移除该表单项的校验结果 | - |

## Form-Item Rules

| 参数      | 说明          | 类型      | 可选值       | 默认值   |
|---------- |-------------- |---------- |-------------  |-------- |
| required    | 是否必填，如不设置，则会根据校验规则自动生成 | boolean    |                |                |
| pattern     | 是否必填，如不设置，则会根据校验规则自动生成 | boolean    |                |                |
| min         | 是否必填，如不设置，则会根据校验规则自动生成 | boolean    |                |                |
| max         | 是否必填，如不设置，则会根据校验规则自动生成 | boolean    |                |                |
| len         | 是否必填，如不设置，则会根据校验规则自动生成 | boolean    |                |                |
| range        | 是否必填，如不设置，则会根据校验规则自动生成 | boolean    |                |                |
| enum         | 是否必填，如不设置，则会根据校验规则自动生成 | boolean    |                |                |
| message     | 提示消息 | string    |                |                |
| trigger     | 触发方式 | string    |                |                |
| type         | 校验类型 | string    |                |                |
| validator   | 自定义校验 | function  |                |                |
