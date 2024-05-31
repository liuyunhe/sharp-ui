---
title: Select
description: Select 组件的文档
---

# Select 选择器

当选项过多时，使用下拉菜单展示并选择内容。

## 基础用法

适用广泛的基础单选 v-model 的值为当前被选中的 option 的 value 属性值。

<preview path="../demo/Select/Basic.vue" title="基础选择器" description="Select 基础选择器"></preview>

## 可清空单选

您可以使用清除图标来清除选择。

设置 `clearable` 属性，则可将选择器清空。

<preview path="../demo/Select/Clear.vue" title="可清空单选" description="Select 可清空单选"></preview>

## 自定义模板

你可以自定义如何来渲染每一个选项, 使用 `renderLabel` 属性，它接受一个回调函数，返回 vNode 类型。

<preview path="../demo/Select/CustomRender.vue" title="自定义模板" description="Select 自定义模板"></preview>

## 筛选选项

可以利用筛选功能快速查找选项。

添加 `filterable` 属性即可启用搜索功能。 默认情况下，Select 会找出所有 label 属性包含输入值的选项。 如果希望使用其他的搜索逻辑，可以通过传入一个 `filter-method` 来实现。 filter-method 为一个 Function，它会在输入值发生变化时调用，参数为当前输入值。

<preview path="../demo/Select/Filter.vue" title="筛选选项" description="Select 筛选选项"></preview>

## 远程搜索

输入关键字以从远程服务器中查找数据。

服务器搜索数据，输入关键字进行查找。为了启用远程搜索，需要将 `filterable` 和 `remote` 设置为true，同时传入一个`remote-method`。 remote-method 为一个返回 Promise 的Function，类型为 `(value: string) => Promise<SelectOption[]>` 。

<preview path="../demo/Select/Remote.vue" title="筛选选项" description="Select 筛选选项"></preview>

## Select Attributes

| 参数                  | 说明                                                                           | 类型     | 可选值            | 默认值     |
| --------------------- | ------------------------------------------------------------------------------ | -------- | ----------------- | ---------- |
| v-model               | 绑定值                                                                         | string   | —                 | —          |
| disabled              | 是否禁用                                                                       | boolean  | —                 | false      |
| clearable             | 是否可以清空选项                                                               | boolean  | —                 | false      |
| filterable            | 是否支持搜索                                                                   | boolean  | —                 | false      |
| multiple              | 是否多选                                                                       | boolean  | —                 | false      |
| remote                | 是否为远程搜索                                                                 | boolean  | —                 | false      |
| remote-method         | 远程搜索的方法                                                                 | function | —                 | —          |
| placeholder           | 占位符                                                                         | string   | —                 | 请选择     |
| size                  | 输入框尺寸                                                                     | string   | medium/small/mini | —          |
| loading               | 是否处于加载状态                                                               | boolean  | —                 | false      |
| loading-text          | 加载中的文字描述                                                               | string   | —                 | 加载中...  |
| no-match-text         | 搜索条件无匹配时显示的文字，也可以使用`slot="empty"`设置                       | string   | —                 | 无匹配数据 |
| no-data-text          | 选项为空时显示的文字，也可以使用`slot="empty"`设置                             | string   | —                 | 无数据     |
| popper-class          | Select 下拉框的类名                                                            | string   | —                 | —          |
| popper-append-to-body | 是否将弹出框插入至 body 元素。在弹出框的定位出现问题时，可将该属性设置为 false | boolean  | —                 | true       |
| name                  | 原生 name 属性                                                                 | string   | —                 | —          |
| autocomplete          | 原生 autocomplete 属性                                                         | string   | —                 | off        |
| auto-complete         | 自动补全                                                                       | string   | —                 | off        |
| automatic-dropdown    | 对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单                  | boolean  | —                 | false      |
| popper-options        | 菜单配置，具体配置参考 popper.js 文档                                          | object   | —                 | —          |
| reserve-keyword       | 多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词                       | boolean  | —                 | false      |
| default-first-option  | 在输入框按下回车，选择第一个匹配项。需配合 `filterable` 或 `remote` 使用       | boolean  | —                 | false      |
| popper-class          | Select 下拉框的类名                                                            | string   | —                 | —          |
| debounce              | 搜索关键词输入的去抖延迟，毫秒，默认 300                                       | number   | —                 | 300        |
| filter-method         | 自定义搜索方法                                                                 | function | —                 | —          |
| remote                | 是否为远程搜索                                                                 | boolean  | —                 | false      |
| remote-method         | 远程搜索的方法                                                                 | function | —                 | —          |
| loading-text          | 远程加载时显示的文字                                                           | string   | —                 | 加载中...  |
| no-match-text         | 远程搜索无匹配时显示的文字，也可以使用`slot="empty"`设置                       | string   | —                 | 无匹配数据 |
| popper-class          | Select 下拉框的类名                                                            | string   | —                 | —          |

## Select Events

| 事件名称       | 说明                                     | 会调参数                      |
| -------------- | ---------------------------------------- | ----------------------------- |
| change         | 选中值发生变化时触发                     | 目前的选中值                  |
| visible-change | 下拉框出现/隐藏时触发                    | 出现则为 true，隐藏则为 false |
| remove-tag     | 多选模式下，移除tag时触发                | 移除的tag值                   |
| clear          | 可清空的单选模式下用户点击清空按钮时触发 | —                             |
| blur           | 当 input 失去焦点时触发                  | (event: Event)                |
| focus          | 当 input 获得焦点时触发                  | (event: Event)                |
| click          | 点击 Select 时触发                       | (event: Event)                |

