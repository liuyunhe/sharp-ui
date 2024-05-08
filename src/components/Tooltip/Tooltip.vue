<template>
  <div class="s-tooltip" ref="popperContainerNode" v-on="outerEvents">
    <div class="s-tooltip__trigger" ref="triggerNode" v-on="events">
      <slot />
    </div>
    <Transition :name="transition">
      <div v-if="isOpen" class="s-tooltip__popper" ref="popperNode" v-on="popperEvents">
        <slot name="content">{{ content }}</slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted, reactive, ref, watch } from 'vue'
import type { Instance as PopperInstance } from '@popperjs/core'
import { createPopper } from '@popperjs/core'
import type { TooltipEmits, TooltipProps, TooltipInstance } from './types'
import useClickOutside from '@/hooks/useClickOutside'
import { debounce } from "lodash-es";

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  trigger: 'hover',
  transition: 'fade'
})
const emits = defineEmits<TooltipEmits>()

const isOpen = ref(false)
const popperNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()
const popperContainerNode = ref<HTMLElement>()
let popperInstance: PopperInstance | null = null

let events: Record<string, any> = reactive({})
let outerEvents: Record<string, any> = reactive({})
let popperEvents: Record<string, any> = reactive({})

let openTimes = 0
let closeTimes = 0

const popperOptions = computed(() => {
  return {
    placement: props.placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 9]
        }
      }
    ],
    ...props.popperOptions
  }
})

const open = () => {
  openTimes++
  console.log('🚀 ~ trigger ~ openTimes:', openTimes)
  isOpen.value = true
  emits('visible-change', isOpen.value)
}

const close = () => {
  closeTimes++
  console.log('🚀 ~ trigger ~ closeTimes:', closeTimes)
  isOpen.value = false
  emits('visible-change', isOpen.value)
}

const openDebounce = debounce(open, props.openDelay)
const closeDebounce = debounce(close, props.closeDelay)

const openFinal = () => { 
  closeDebounce.cancel()
  openDebounce()
}

const closeFinal = () => {
  openDebounce.cancel()
  closeDebounce()
}

const togglePopper = () => {
  if (isOpen.value) {
    closeFinal()
  } else {
    openFinal()
  }
}

useClickOutside(popperContainerNode, () => {
  if (props.trigger === 'click' && isOpen.value && !props.manual) {
    console.log('🚀 ~ useClickOutside ~ : callback called')
    close()
  }
})

const attachEvents = () => {
  if (props.trigger === 'hover') {
    events['mouseenter'] = openFinal
    popperEvents['mouseenter'] = openFinal
    outerEvents['mouseleave'] = closeFinal
  } else if (props.trigger === 'click') {
    events['click'] = togglePopper
  }
}

if (!props.manual) {
  attachEvents()
}

watch(
  () => props.manual,
  (isManual) => {
    if (isManual) {
      events = {}
      outerEvents = {}
      popperEvents = {}
    } else {
      attachEvents()
    }
  }
)

watch(
  () => props.trigger,
  (newTrigger, oldTrigger) => {
    if (newTrigger !== oldTrigger) {
      events = {}
      outerEvents = {}
      popperEvents = {}
      attachEvents()
    }
  }
)

watch(
  () => isOpen.value,
  (newValue) => {
    if (newValue) {
      if (triggerNode.value && popperNode.value) {
        popperInstance = createPopper(triggerNode.value, popperNode.value, popperOptions.value)
      } else {
        popperInstance?.destroy()
      }
    }
  },
  { flush: 'post' }
)

onUnmounted(() => {
  popperInstance?.destroy()
})

defineExpose<TooltipInstance>({
  show: openFinal,
  hide: closeFinal
})
</script>

<style scoped></style>
