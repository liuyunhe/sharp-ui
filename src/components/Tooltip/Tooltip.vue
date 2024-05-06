<template>
  <div class="s-tooltip" v-on="outerEvents">
    <div class="s-tooltip__trigger" ref="triggerNode" v-on="events">
      <slot />
    </div>
    <div v-if="isOpen" class="s-tooltip__popper" ref="popperNode">
      <slot name="content">{{ content }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import type { Instance as PopperInstance } from '@popperjs/core'
import  { createPopper } from '@popperjs/core'
import type { TooltipEmits, TooltipProps } from './types'

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  trigger: 'hover'
 })
const emits = defineEmits<TooltipEmits>()

const isOpen = ref(false)
const popperNode = ref<HTMLElement | null>(null)
const triggerNode = ref<HTMLElement | null>(null)
let popperInstance: PopperInstance | null = null

let events: Record<string, any> = reactive({})
let outerEvents: Record<string, any> = reactive({})

const togglePopper = () => {
  isOpen.value = !isOpen.value
  emits('visible-change',isOpen.value)
}

const open = () => {
  isOpen.value = true
  emits('visible-change',isOpen.value)
}

const close = () => {
  isOpen.value = false
  emits('visible-change',isOpen.value)
}

const attachEvents = () => {
  if (props.trigger === 'hover') {
    events['mouseenter'] = open
    outerEvents['mouseleave'] = close
  } else if (props.trigger === 'click') {
    events['click'] =  togglePopper
  }
}

attachEvents()

watch(() => props.trigger, (newTrigger, oldTrigger) => {
  if (newTrigger !== oldTrigger) { 
    events = {}
    outerEvents = {}
    attachEvents()
  }
})

watch(() => isOpen.value, (newValue) => {
  if (newValue) {
    if (triggerNode.value && popperNode.value) {
      popperInstance = createPopper(triggerNode.value, popperNode.value, {
        placement: props.placement
      })
    } else { 
      popperInstance?.destroy()
    }
  } 
}, {flush: 'post'})
</script>

<style scoped></style>
