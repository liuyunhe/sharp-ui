<template>
  <div
    ref="messageRef"
    v-show="visible"
    class="s-message"
    :class="{ [`s-message--${type}`]: type, 'is-close': showClose }"
    role="alert"
    :style="cssStyle"
    @mouseenter="clearTimer"
    @mouseleave="startTimer"
  >
    <div class="s-message__content">
      <slot>
        <RenderVnode v-if="message" :vNode="message" />
      </slot>
    </div>
    <div v-if="showClose" class="s-message__close">
      <Icon icon="xmark" @click.stop="visible = false" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type MessageProps } from './types'
import Icon from '@/components/Icon/Icon.vue'
import RenderVnode from '@/components/Common/RenderVnode'
import { computed, onMounted, ref, watch, nextTick, getCurrentInstance } from 'vue'
import { getLastBottomOffset } from './methods'
import useEventListener from '@/hooks/useEventListener'

const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  duration: 3000,
  offset: 20
})

const messageRef = ref<HTMLDivElement>()
const instance = getCurrentInstance()
console.log('🚀 ~ inner instance:', instance)

// 计算偏移高度
// 初始化div高度
const height = ref(0)
// 上一个实例的最下面的坐标数字，第一个是0
const lastOffset = computed(() => getLastBottomOffset(props.id))
// 这个元素应该使用的top
const topOffset = computed(() => props.offset + lastOffset.value)
// 为下一个元素预留offset,也就是它最底端bottom的值
const bottomOffset = computed(() => height.value + topOffset.value)

const cssStyle = computed(() => ({
  top: topOffset.value + 'px',
  zIndex: props.zIndex
}))

// 创建一个名为visible的ref，初始值为false
// 该ref用于追踪组件内的可见性状态
const visible = ref(false)

let timer : any // 定义一个变量来存储计时器的ID

/**
 * 开始计时器，当计时器结束时，若组件可见，则将其隐藏。
 * 
 * @param {Number} props.duration - 计时器持续时间，单位为毫秒。此参数未在函数内直接使用，但假定为外部传入的参数。
 */
const startTimer = () => {
  // 如果设定的持续时间大于0，则启动计时器
  if (props.duration > 0) {
    timer = setTimeout(() => {
      // 若组件在计时器结束时仍可见，则将其隐藏
      if (!visible.value) return
      visible.value = false
    }, props.duration)
  }
}

const clearTimer = () => {
  console.log(1)
  // 清除计时器，防止其继续执行
  clearTimeout(timer)
}

onMounted(async () => {
  visible.value = true // 设置组件为可见状态
  startTimer() // 启动计时器
  await nextTick() // 等待DOM更新
  height.value = messageRef.value!.getBoundingClientRect().height // 获取并设置消息元素的高度
})

/**
 * 监听文档的keydown事件，当按下Escape键时，隐藏当前可见的内容。
 * @param e 事件对象，通过事件委托获取的实际触发的事件。
 */
const keydown = (e:Event)=>{
  const event = e as KeyboardEvent // 将事件对象断言为键盘事件类型
  if(event.code === 'Escape'){ // 检查按键是否为Escape
    visible.value = false // 隐藏内容
  }
}

// 在文档上使用事件监听器，监听keydown事件
useEventListener(document,'keydown',keydown)

/**
 * 监听visible的值的变化
 * 当visible的值变为false时，调用props中的onDestory方法
 */
watch(visible, (newValue) => {
  if (!newValue) {
    // 当visible变为false时
    props.onDestory() // 调用销毁函数
  }
})

defineExpose({
  bottomOffset, // 暴露bottomOffset变量，允许外部访问和修改。
  visible
})
</script>

<style scoped></style>
