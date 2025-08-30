---
title: MessageBox 消息弹框
description: MessageBox 组件的文档
---

# MessageBox 消息弹框

模拟系统的消息提示框而实现的一套模态对话框组件，用于消息提示、确认消息和提交内容。

::: tip
从设计上来说，MessageBox 的作用是美化系统自带的 alert、confirm 和 prompt，因此适合展示较为简单的内容。
:::

## 消息提示

当用户进行操作时会被触发，该对话框中断用户操作，直到用户确认知晓后才可关闭。

调用 ElMessageBox.alert 方法以打开 alert 框。 它模拟了系统的 alert，无法通过按下 ESC 或点击框外关闭。 此例中接收了两个参数，message和title。 值得一提的是，窗口被关闭后，它默认会返回一个Promise对象便于进行后续操作的处理。 若不确定浏览器是否支持Promise，可自行引入第三方 polyfill 或像本例一样使用回调进行后续处理。

<preview path="../demo/MessageBox/Basic.vue" title="消息提示" />

## 确认消息

提示用户确认其已经触发的动作，并询问是否进行此操作时会用到此对话框。

调用 ElMessageBox.confirm 方法以打开 confirm 框。它模拟了系统的 confirm。 Message Box 组件也拥有极高的定制性，我们可以传入 options 作为第三个参数，它是一个字面量对象。 type 字段表明消息类型，可以为success，error，info和 warning，无效的设置将会被忽略。 需要注意的是，第二个参数 title 必须定义为 String 类型，如果是 Object，会被当做为 options使用。 在这里我们返回了一个 Promise 来处理后续响应。

<preview path="../demo/MessageBox/Confirm.vue" title="确认消息" />

## 提交内容

当需要用户输入内容时，可以使用 Prompt 类型的消息框。

调用 ElMessageBox.prompt 方法以打开 prompt 框。它模拟了系统的 prompt。 可以用 inputPattern 字段自己规定匹配模式， 使用 inputValidator 来指定验证方法，它应该返回 Boolean 或 String。 返回 false 或 String 表示验证失败， 返回的字符串将用作 inputErrorMessage，用来提示用户错误原因。 此外，可以用 inputPlaceholder 字段来定义输入框的占位符。

<preview path="../demo/MessageBox/Prompt.vue" title="提交内容" />

## 使用 VNode

`message` 可以是 VNode。

<preview path="../demo/MessageBox/VNode.vue" title="使用VNode" />

## 个性化

消息弹框可以被定制来展示各种内容。

上面提到的三个方法都是对 ElMessageBox 方法的二次包装。 本例直接调用 ElMessageBox 方法，使用了 showCancelButton 字段，用于显示取消按钮。 另外可使用 cancelButtonClass 为其添加自定义样式，使用 cancelButtonText 来自定义取消按钮文本（Confirm 按钮也具有相同的字段，在文末的 API 说明中有完整的字段列表）。 此例还使用了 beforeClose 属性， 当 beforeClose 被赋值且被赋值为一个回调函数时，在消息弹框被关闭之前将会被调用，并且可以通过该方法来阻止弹框被关闭。 它是一个接收三个参数：action、instance 和done 的方法。 使用它能够在关闭前对实例进行一些操作，比如为确定按钮添加 loading 状态等；此时若需要关闭实例，可以调用 done 方法（若在 beforeClose 中没有调用 done，则弹框便不会关闭）。

<preview path="../demo/MessageBox/DIY.vue" title="个性化" />

## 使用 HTML 片段

message 支持传入 HTML 字符串来作为正文内容

将 dangerouslyUseHTMLString 属性设置为 true，message 属性就会被当作 HTML 片段处理。

<preview path="../demo/MessageBox/HTML.vue" title="个性化" />

::: warning
message 属性虽然支持传入 HTML 片段，但是在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 XSS 攻击。 因此在 dangerouslyUseHTMLString 打开的情况下，请确保 message 的内容是可信的，永远不要将用户提交的内容赋值给 message 属性。
:::

## 区分取消操作与关闭操作

有些场景下，点击取消按钮与点击关闭按钮有着不同的含义。

默认情况下，当用户触发取消（点击取消按钮）和触发关闭（点击关闭按钮或遮罩层、按下 ESC 键）时，Promise 的 reject 回调和 callback 回调的参数均为 'cancel'。 如果将distinguishCancelAndClose属性设置为 true，则上述两种行为的参数分别为 'cancel' 和 'close'。

<preview path="../demo/MessageBox/CancelAndClose.vue" title="个性化" />

## 内容居中

消息弹框支持使用居中布局。

将 `center` 属性设置为 `true` 可将内容居中显示

<preview path="../demo/MessageBox/Center.vue" title="内容居中" />。

## 自定义图标

图标可以使用任意Vue 组件或[渲染函数 (JSX)](https://vuejs.org/guide/extras/render-function.html)来自定义。

<preview path="../demo/MessageBox/Icon.vue" title="自定义图标" />。

## 可拖放

设置 MessageBox 可以拖拽。

设置draggable属性为true来开启拖拽弹窗能力。 设置 overflow 2.5.4 为 true 可以让拖拽范围超出可视区。

<preview path="../demo/MessageBox/Draggable.vue" title="可拖放" />。

## 全局方法

如果你完整引入了``sharp-ui``，它会为 app.config.globalProperties 添加如下全局方法：$msgbox、 $alert、 $confirm 和 $prompt。 因此在 Vue 实例中可以采用本页面中的方式来调用MessageBox。 参数如下：

- $msgbox(options)
- $alert(message, title, options) 或 $alert(message, options)
- $confirm(message, title, options) 或 $confirm(message, options)
- $prompt(message, title, options) 或 $prompt(message, options)

## 按需引入

如果您需要按需引入 `MessageBox`：

```js
import { createMessageBox } from '@shepardliu/sharp-ui'
```

那么对应于上述四个全局方法的调用方法依次为：`createMessageBox`、`createMessageBox.alert`、`createMessageBox.confirm` 和 `createMessageBox.prompt`。 参数同上所述。

## MessageBox API

### 配置项

| Name                         | Description                                                                                                                                           | Type                                                                               | Default                                          |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------ |
| autofocus                    | MessageBox打开时是否自动获得焦点 MessageBox                                                                                                           | boolean                                                                         | true                                             |
| title                        | MessageBox的标题文本                                                                                                                                  | string                                                                          | ''                                               |
| message                      | message内容是否作为HTML字符串处理                                                                                                                     | string / VNode / Function`() => VNode` (2.2.17)                          | —                                                |
| dangerouslyUseHTMLString     | whether `message` is treated as HTML string                                                                                                           | boolean                                                                         | false                                            |
| type                         | 图标显示，如成功、信息、警告或错误                                                                                                                    | enum`'success' \| 'info' \| 'warning' \| 'error'`                               | ''                                               |
| icon                         | 自定义图标组件，会覆盖type指定的图标。                                                                                                                | string / Component                                                           | ''                                               |
| custom-class                 | MessageBox 的自定义类名                                                                                                                               | string                                                                          | ''                                               |
| custom-style                 | MessageBox 的自定义内联样式                                                                                                                           | CSSProperties                                                                   | {}                                               |
| callback                     | 若不使用 Promise，可以使用此参数指定 MessageBox 关闭后的回调                                                                                          | Function`(value: string, action: Action) => any \| (action: Action) => any`     | null                                             |
| showClose                    | MessageBox 是否显示右上角关闭按钮                                                                                                                     | boolean                                                                         | true                                             |
| before-close                 | messageBox 关闭前的回调，会暂停消息弹出框的关闭过程。                                                                                                 | Function`(action: Action, instance: MessageBoxState, done: () => void) => void` | null                                             |
| distinguish-cancel-and-close | 是否将取消（点击取消按钮）与关闭（点击关闭按钮或遮罩层、按下 Esc 键）进行区分                                                                         | boolean                                                                         | false                                            |
| lock-scroll                  | 是否在 MessageBox 出现时将 body 滚动锁定                                                                                                              | boolean                                                                         | true                                             |
| show-cancel-button           | 是否显示取消按钮                                                                                                                                      | boolean                                                                         | false (true when called with confirm and prompt) |
| show-confirm-button          | 是否显示确定按钮                                                                                                                                      | boolean                                                                         | true                                             |
| cancel-button-text           | 取消按钮的文本内容                                                                                                                                    | string                                                                          | Cancel                                           |
| confirm-button-text          | 确定按钮的文本内容                                                                                                                                    | string                                                                          | OK                                               |
| cancel-button-class          | 取消按钮的自定义类名                                                                                                                                  | string                                                                          | ''                                               |
| confirm-button-class         | 确定按钮的自定义类名                                                                                                                                  | string                                                                          | ''                                               |
| close-on-click-modal         | 是否可通过点击遮罩层关闭 MessageBox                                                                                                                   | boolean                                                                         | true (false when called with alert)              |
| close-on-press-escape        | 是否可通过按下 ESC 键关闭 MessageBox                                                                                                                  | boolean                                                                         | true (false when called with alert)              |
| close-on-hash-change         | 是否在 hash 改变时关闭 MessageBox                                                                                                                     | boolean                                                                         | true                                             |
| show-input                   | 是否显示输入框                                                                                                                                        | boolean                                                                         | false (true when called with prompt)             |
| input-placeholder            | 输入框占位文本                                                                                                                                        | string                                                                          | ''                                               |
| input-type                   | 输入框的类型                                                                                                                                          | string                                                                          | text                                             |
| input-value                  | 输入框的初始文本                                                                                                                                      | string                                                                          | null                                             |
| input-pattern                | 输入框的校验表达式                                                                                                                                    | regexp                                                                          | null                                             |
| input-validator              | 输入框的校验函数。 应该返回一个 boolean 或者 string， 如果返回的是一个 string 类型，那么该返回值会被赋值给 inputErrorMessage 用于向用户展示错误消息。 | Function`(value: string) => boolean \| string`                                  | null                                             |
| input-error-message          | 校验未通过时的提示文本                                                                                                                                | string                                                                          | Illegal input                                    |
| center                       | 是否居中布局                                                                                                                                          | boolean                                                                         | false                                            |
| draggable                    | MessageBox 是否可拖放                                                                                                                                 | boolean                                                                         | false                                            |
| overflow (2.5.4)            | MessageBox 拖动范围可以超出可视区                                                                                                                     | boolean                                                                         | false                                            |
| round-button                 | 是否使用圆角按钮                                                                                                                                      | boolean                                                                         | false                                            |
| button-size                  | 自定义确认按钮及取消按钮的大小                                                                                                                        | string`'small' \| 'default' \| 'large'`                                         | default                                          |
| append-to (2.2.19)          | 设置组件的根元素                                                                                                                                      | string / HTMLElement                                                         | —                                                |
