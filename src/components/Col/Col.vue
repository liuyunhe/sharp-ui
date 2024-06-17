<template>
  <component :is="tag" :class="colKls" :style="style">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { isNumber, isObject } from '@/utils/types'
import { useNamespace } from '@/hooks/useNameSpace'
import { rowContextKey } from '@/components/Row/constants'
import type { ColProps } from './types'
import type { CSSProperties } from 'vue'

defineOptions({
  name: 'SCol',
})

const props = withDefaults(defineProps<ColProps>(), {
  tag: 'div',
  span: 24,
  offset: 0,
  pull: 0,
  push: 0,
  xs: undefined,
  sm: undefined,
  md: undefined,
  lg: undefined,
  xl: undefined,
})

const ns = useNamespace('col')

const { gutter } = inject(rowContextKey, { gutter: computed(() => 0) })

const style = computed(() => {
  const styles: CSSProperties = {}
  if (gutter.value) {
    styles.paddingLeft = styles.paddingRight = `${gutter.value / 2}px`
  }
  return styles
})

const colKls = computed(() => {
  const classes: string[] = []
  const pos = ['span', 'offset', 'pull', 'push'] as const

  pos.forEach((prop) => {
    const size = props[prop]
    if (isNumber(size)) {
      if (prop === 'span') classes.push(ns.b(`${props[prop]}`))
      else if (size > 0) classes.push(ns.b(`${prop}-${props[prop]}`))
    }
  })

  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
  sizes.forEach((size) => {
    if (isNumber(props[size])) {
      classes.push(ns.b(`${size}-${props[size]}`))
    } else if (isObject(props[size])) {
      Object.entries(props[size]).forEach(([prop, sizeProp]) => {
        classes.push(
          prop !== 'span'
            ? ns.b(`${size}-${prop}-${sizeProp}`)
            : ns.b(`${size}-${sizeProp}`)
        )
      })
    }
  })

  // this is for the fix
  if (gutter.value) {
    classes.push(ns.is('guttered'))
  }
  return [ns.b(), classes]
})
</script>
