<template>
  <header :class="ns.b()" :style="style">
    <slot />
  </header>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useNamespace } from '@/hooks/useNameSpace'

import type { CSSProperties } from 'vue'

defineOptions({
  name: 'SHeader',
})

const props = defineProps({
  /**
   * @description height of the header
   */
  height: {
    type: String,
    default: null,
  },
})

const ns = useNamespace('header')
const style = computed(() => {
  return props.height
    ? (ns.cssVarBlock({
        height: props.height,
      }) as CSSProperties)
    : {}
})
</script>
