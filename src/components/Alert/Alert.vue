<template>
  <Transition :name="ns.b('fade')">
    <div
      v-show="visible"
      ref="alertRef"
      role="alert"
      class="s-alert"
      :class="{ [`s-alert--${type}`]: type, 'is-close': closeable, 'is-dark': effect === 'dark' }"
    >
      <Icon v-if="showIcon" :icon="DEFAULT_ICON[type]" class="s-alert__icon"></Icon>
      <div class="s-alert__content">
        <span class="s-alert__title">
          <slot>{{ content }}</slot>
        </span>
      </div>
      <div v-if="closeable" class="s-alert__close">
        <Icon icon="xmark" @click.stop="onClose" />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import Icon from '@/components/Icon/Icon.vue'
import type { AlertEvents, AlertInstance, AlertProps } from './types'
import { ref } from 'vue'
import { DEFAULT_ICON } from '@/components/Message'
import { useNamespace } from '@/hooks'
defineOptions({
  name: 'SAlert'
})
withDefaults(defineProps<AlertProps>(), {
  type: 'info',
  closeable: true,
  showIcon: false,
  effect: 'light'
})
const emits = defineEmits<AlertEvents>()

const ns = useNamespace('alert')

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
