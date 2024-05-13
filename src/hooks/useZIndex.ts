import { computed, ref } from 'vue'

// 全局zIndex变量，用于管理全局的zIndex值
const zIndex = ref(0)

/**
 * 一个zIndex管理器，提供初始zIndex、当前zIndex以及获取下一个zIndex的功能。
 * @param {number} initialValue - 初始的zIndex值，默认为2000。
 * @returns {Object} 返回包含initialZIndex, currentZIndex, nextZIndex的对象。
 */
const useZIndex = (initialValue = 2000) => {
  // 初始化自定义的zIndex，不会影响全局zIndex
  const initialZIndex = ref(initialValue)
  // 计算当前实际的zIndex，结合了全局和自定义的初始值
  const currentZIndex = computed(() => zIndex.value + initialZIndex.value)
  // 获取下一个可用的zIndex，并更新全局zIndex
  const nextZIndex = () => {
    zIndex.value++ // 增加全局zIndex值
    return currentZIndex.value // 返回当前计算后的zIndex值
  }

  // 返回相关的zIndex管理函数和值
  return {
    initialZIndex,
    currentZIndex,
    nextZIndex
  }
}

export default useZIndex
