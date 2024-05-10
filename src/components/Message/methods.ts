/**
 * 创建并渲染一个消息组件
 * @param props - 消息组件的属性
 * 功能描述：该函数动态创建一个消息组件，并将其渲染到文档的<body>部分。
 * 详细流程包括：创建一个<div>容器、生成组件的虚拟节点（vnode），然后使用Vue的render函数将该vnode渲染到创建的<div>容器中，
 * 最后将这个容器添加到<body>元素里。
 */
import { render, h } from 'vue'
import { type CreateMessageProps, type MessageContext } from './types'
import MessageConstructor from './Message.vue'

// 用于管理消息实例的数组和生成唯一ID的种子
let seed = 1

/**
 * 定义一个空数组 `instances`，用于存储 `MessageContext` 类型的实例。
 * 
 * @type {MessageContext[]} - 该数组专门用于存储 `MessageContext` 类型的实例对象。
 */
const instances: MessageContext[] = []

/**
 * 动态创建并渲染消息组件。
 * @param props - 组件的属性
 */
export const createMessage = (props: CreateMessageProps) => {
  // 为每个消息实例生成唯一ID
  const id = `message_${seed++}`

  // 创建一个<div>容器用于渲染消息组件
  const container = document.createElement('div')

  /**
   * 销毁函数，用于移除渲染的消息组件。
   */
  const destory = () => {
    // 在实例数组中查找并移除当前消息实例
    const idx = instances.findIndex((instance) => instance.id === id)
    if (idx === -1) return
    instances.splice(idx, 1)
    render(null, container) // 清空渲染的组件
  }

  // 合并用户传入的props和销毁函数
  const newProps = { ...props, onDestory: destory }
  // 使用Vue的h函数创建虚拟节点
  const vnode = h(MessageConstructor, newProps)
  // 将虚拟节点渲染到<div>容器
  render(vnode, container)

  // 将渲染好的容器添加到<body>元素
  document.body.appendChild(container.firstElementChild!)
  // 将实例信息保存到数组中
  const instance = { id, vnode, props: newProps, destory }
  instances.push(instance)
}

/**
 * 获取最后一个创建的消息组件实例。
 * @returns 最后一个消息组件实例
 */
export const getLastInstance = () => {
  return instances.at(-1)
}

/**
 * 获取最后一个消息组件实例的底部偏移量。
 * @returns 底部偏移量
 */
export const getLastBottomOffset = () => {
  return 0
}
