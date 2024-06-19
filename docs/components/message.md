---
title: Message
description: Message 组件的文档
---

# Message 消息提示

常用于主动操作后的反馈提示。与 Notification 的区别是后者更多用于系统级通知的被动提醒。

## 基础用法

从顶部出现，3 秒后自动消失。

<preview path="../demo/Message/Basic.vue" title="基础用法" />

## 不同状态

用来显示「成功、警告、消息、错误」类的操作反馈。

<preview path="../demo/Message/Types.vue" title="不同状态" />

## 可关闭

可以添加关闭按钮。

<preview path="../demo/Message/Close.vue" title="不同状态" />
<!-- 
## 文字居中

使用 center 属性让文字水平居中。

## 使用 HTML 片段

message 属性支持传入 HTML 片段。 -->



## Message 配置项

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|-------------|----------------|-------------|--------------------------------  |-------------|
| type     | 消息提示类型   | string  | success/warning/info/error | info    |
| message  | 消息文字     | string  | —                                | —       |
| showClose | 是否显示关闭按钮 | boolean | —                                | false   |
| center    | 文字是否居中   | boolean | —                                | false   |
| duration | 显示时间, 毫秒。设为 0 则不会自动关闭 | number  | —                                | 3000     |
| onClose  | 关闭时的回调函数，会传入关闭函数作为参数 | function | —                                | —       |
| offset   | 消息框距离顶部的偏移量 | number  | —                                | 16       |

## Message 方法
调用 createMessage 会返回当前 Message 的实例。 如果需要手动关闭实例，可以调用它的 close 方法。
| 方法名 | 说明 | 类型 |
|---------- |-------- |---------- |
| destory &emsp;&emsp;&emsp;&emsp;| 关闭当前的 Message &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;   | function &emsp;&emsp;&emsp;  |

