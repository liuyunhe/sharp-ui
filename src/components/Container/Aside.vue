<template>
  <aside :class="ns.b()" :style="style">
    <slot />
  </aside>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useNamespace } from '@/hooks/useNameSpace'

import type { CSSProperties } from 'vue'

defineOptions({
  name: 'SAside',
})
const props = defineProps({
  /**
   * @description width of the side section
   */
  width: {
    type: String,
    default: null,
  },
})

const ns = useNamespace('aside')
const style = computed(
  () =>
    (props.width ? ns.cssVarBlock({ width: props.width }) : {}) as CSSProperties
)
</script>
