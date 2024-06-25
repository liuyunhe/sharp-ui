<template>
  <a
    :class="linkKls"
    :href="disabled || !href ? undefined : href"
    :target="disabled || !href ? undefined : target"
    @click="handleClick"
  >
    <Icon v-if="icon"  :icon="icon" />
    <span v-if="$slots.default" :class="ns.e('inner')">
      <slot />
    </span>

    <slot v-if="$slots.icon" name="icon"/>
  </a>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import  Icon  from '@/components/Icon/Icon.vue'
import { useNamespace } from '@/hooks/useNameSpace'
import { type LinkProps,linkEmits } from './types'

defineOptions({
  name: 'SLink',
})
const props = withDefaults(defineProps<LinkProps>(), {
  type: 'default',
  underline: true,
  disabled: false,
  href: '',
  target:'_self',
})

const emit = defineEmits(linkEmits)

const ns = useNamespace('link')

const linkKls = computed(() => [
  ns.b(),
  ns.m(props.type),
  ns.is('disabled', props.disabled),
  ns.is('underline', props.underline && !props.disabled),
])

function handleClick(event: MouseEvent) {
  if (!props.disabled) emit('click', event)
}
</script>
