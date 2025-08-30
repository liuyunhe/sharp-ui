<template>
  <component
    :is="tag"
    class="s-row"
    :class="{
      [`justify-${justify}`]: justify !== 'start',
      [`align-${align}`]: !!align
    }"
    :style="style"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'
import { rowContextKey } from './constants'
import type { RowProps } from './types'
import type { CSSProperties } from 'vue'

defineOptions({
  name: 'SRow'
})

const props = withDefaults(defineProps<RowProps>(), {
  tag: 'div',
  gutter: 0,
  justify: 'start'
})

const gutter = computed(() => props.gutter)

provide(rowContextKey, {
  gutter
})

const style = computed(() => {
  const styles: CSSProperties = {}
  if (!props.gutter) {
    return styles
  }

  styles.marginRight = styles.marginLeft = `-${props.gutter / 2}px`
  return styles
})
</script>
