<template>
  <div
    v-show="visible"
    ref="alertRef"
    role="alert"
    class="s-alert"
    :class="{ [`s-alert--${type}`]: type, 'is-close': closeable, 'is-dark': effect === 'dark' }"
  >
    <div class="s-alert__content">
      <span class="s-alert__title">
        <slot>{{ content }}</slot>
      </span>
    </div>
    <div v-if="closeable" class="s-alert__close">
      <Icon icon="xmark" @click.stop="onClose" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from '@/components/Icon/Icon.vue'
import type { AlertEvents, AlertInstance, AlertProps } from './types'
import { ref } from 'vue'
defineOptions({
  name: 'S-Alert'
})
withDefaults(defineProps<AlertProps>(), {
  type: 'info',
  closeable: true
})
const emits = defineEmits<AlertEvents>()

const alertRef = ref<HTMLElement>()

const visible = ref(true)

const onClose = () => {
  visible.value = false
  emits('close')
}

const show = () => {
  visible.value = true
}

defineExpose<AlertInstance>({
  show,
  hide: onClose
})
</script>

<style scoped></style>
