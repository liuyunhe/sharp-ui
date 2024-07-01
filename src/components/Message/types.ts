import type { VNode, ComponentInternalInstance } from 'vue'
import type Message from './Message.vue'

/**
 * MessageProps 定义了消息组件的属性
 * @message 消息内容，可以是字符串或虚拟节点
 * @duration 消息显示的持续时间，单位为毫秒
 * @showClose 是否显示关闭按钮
 * @type 消息类型，可选值为 'success'、'info'、'warning'、'danger'
 * @onDestory 消息被销毁时的回调函数
 * @id 消息的唯一标识符。
 * @zIndex 消息组件的z-index值，用于控制层叠顺序。
 * @offset 消息垂直偏移量，用于控制消息位置
 * @transitionName 转场动画名称
 */
export interface MessageProps {
  message?: string | VNode
  duration?: number
  showClose?: boolean
  type?: 'success' | 'info' | 'warning' | 'danger'
  onDestory: () => void
  id: string;
  zIndex: number;
  offset?: number
  transitionName?: string
}

/**
 * MessageContext 定义了消息组件上下文
 * @id 消息的唯一标识符
 * @vnode 虚拟节点，代表消息组件
 * @props 消息组件的属性
 * @vm 组件的内部实例，用于访问组件的内部方法和属性
 * @destory 销毁消息组件的方法
 */
export interface MessageContext {
  id: string
  vnode: VNode
  vm: ComponentInternalInstance;
  props: MessageProps
  destory: () => void
}

/**
 * CreateMessageProps 定义了创建消息组件时的属性，排除了 onDestory、id 和 zIndex
 */
export type CreateMessageProps = Omit<MessageProps, 'onDestory' | 'id' | 'zIndex'>

export type MessageInstance = InstanceType<typeof Message>

export interface MessageConfigContext {
  max?: number
}

export const DEFAULT_ICON = {
  info: 'circle-info',
  success: 'circle-check',
  primary: 'circle-check',
  warning: 'circle-exclamation',
  error: 'circle-xmark',
  danger: 'circle-xmark'
}