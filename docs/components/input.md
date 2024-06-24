---
title: Input
description: Input 组件的文档
---

# Input 输入框

通过鼠标或键盘输入字符

## 基础文本框

<preview path="../demo/Input/Basic.vue" title="基础文本框" description="Input 基础文本框"></preview>

## 禁用文本框

通过 **disabled** 属性指定是否禁用 input 组件

<preview path="../demo/Input/Disable.vue" title="禁用文本框" description="Input 禁用文本框"></preview>

## 尺寸

使用 size 属性改变输入框大小。 除了默认大小外，还有另外两个选项： **large**, **small**。

<preview path="../demo/Input/Size.vue" title="不同尺寸文本框" description="不同尺寸文本框"></preview>

## 复合型输入框

可以在输入框前置或后置一个元素，通常是标签或按钮。可以使用 **prepend** 和 **append** 插槽。
要在输入框中添加前后元素，可以使用 **prefix** 和 **suffix** 插槽。

<preview path="../demo/Input/Combo.vue" title="复合型输入框" description="Input 复合型输入框"></preview>

## Textarea

用于输入多行文本信息可缩放的输入框。 添加 **type="textarea"** 属性来将 input 元素转换为原生的 textarea 元素。

<preview path="../demo/Input/Textarea.vue" title="Textarea" description="Textarea"></preview>

## 密码文本框

使用 **show-password** 属性即可得到一个可切换显示隐藏的密码框

<preview path="../demo/Input/Password.vue" title="密码文本框" description="Input 密码文本框"></preview>

## 清空文本框

使用 **clearable** 属性即可得到一个可一键清空的输入框

<preview path="../demo/Input/Clear.vue" title="清空文本框" description="Input 清空文本框"></preview>

## Input Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|------------|----------------|------------|--------------------------------|--------|
| type        | 类型           | string    | text, textarea, password, url, email, date | text    |
| value       | 绑定值         | string    | —                                | —        |
| size        | 尺寸           | string    | medium / small / mini        | —        |
| disabled    | 禁用           | boolean   | —                                | false    |
| readonly     | 只读           | boolean   | —                                | false    |
| maxlength   | 最大输入长度 | number    | —                                | —        |
| minlength   | 最小输入长度 | number    | —                                | —        |
| placeholder  | 占位文本       | string    | —                                | —        |
| show-word-limit | 是否显示输入字数统计 | boolean   | —                                | false    |
| clearable    | 是否可清空       | boolean   | —                                | false    |
| show-password | 是否显示切换密码图标 | boolean   | —                                | false    |
| name          | 原生属性       | string    | —                                | —        |
| readonly       | 原生属性       | boolean   | —                                | false    |
| max           | 原生属性       | string    | —                                | —        |
| min           | 原生属性       | string    | —                                | —        |
| autocomplete  | 原生属性       | string    | on, off                          | off      |

## Input Slots

| 名称      | 说明          |
|------------|----------------|
| prepend    | 输入框前置内容 |
| append      | 输入框后置内容 |
| prefix      | 输入框头部图标 |
| suffix      | 输入框尾部图标 |
| prefix-icon | 输入框头部图标 |
| suffix-icon | 输入框尾部图标 |

## Input Events

| 事件名称 | 说明                                     | 回调参数                                     |
|----------|----------------------------------------|--------------------------------------------|
| blur      | 在 Input 失去焦点时触发                      | (event: Event)                                  |
| focus      | 在 Input 获得焦点时触发                      | (event: Event)                                  |
| change    | 仅在输入框失去焦点或用户按下回车时触发 | (value: string \| number)                              |
| input      | 在 Input 值改变时触发                      | (value: string \| number)                              |
| clear      | 在点击由 clearable 属性生成的清空按钮时触发 | —                                                |


