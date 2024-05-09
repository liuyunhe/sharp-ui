/**
 * 创建一个Vue组件，用于渲染传入的虚拟节点（vNode）。
 * 在vue单文件template中渲染vNode。
 *
 * @param vNode - 组件的props之一，要求必须提供。它可以是字符串或者对象类型，代表需要渲染的虚拟节点。
 * @returns 返回一个函数，该函数不接受任何参数，返回值为传入的vNode，用于动态渲染内容。
 */
import { defineComponent } from 'vue'
const RenderVnode = defineComponent({
  props: {
    vNode: {
      type: [String, Object],
      required: true
    }
  },
  // 设置组件的渲染函数，直接返回props中的vNode。
  setup(props) {
    return () => props.vNode
  }
})

export default RenderVnode
