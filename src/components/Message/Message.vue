<template>
  <div
    ref="messageRef"
    v-show="visible"
    class="s-message"
    :class="{ [`s-message--${type}`]: type, 'is-close': showClose }"
    role="alert"
    :style="cssStyle"
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
import { getLastInstance, getLastBottomOffset } from "./methods";

const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  duration: 3000,
  offset: 20
})

const messageRef = ref<HTMLDivElement>()
const instance = getCurrentInstance()
console.log("🚀 ~ inner instance:", instance)
// 计算偏移高度
// 这个div高度
const height = ref(0)
// 上一个实例的最下面的坐标数字，第一个是0
const lastOffset = computed(() => getLastBottomOffset(props.id))
// 这个元素应该使用的top
const topOffset = computed(() => props.offset + lastOffset.value)
// 为下一个元素预留offset,也就是它最底端bottom的值
const bottomOffset = computed(() => height.value + topOffset.value)

const cssStyle = computed(() => ({ 
  top: topOffset.value + 'px',
}))


const visible = ref(false)
const startTimer = () => {
  if (props.duration > 0) {
    setTimeout(() => {
      if (!visible.value) return
      visible.value = false
    }, props.duration)
  }
}

onMounted(async() => {
  visible.value = true
  startTimer()
  await nextTick()
  height.value = messageRef.value!.getBoundingClientRect().height
})
watch(visible, (newValue) => {
  if (!newValue) {
    props.onDestory()
  }
})

defineExpose({
  bottomOffset
})
</script>

<style scoped></style>
