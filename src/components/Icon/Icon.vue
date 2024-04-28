<template>
  <i class="s-icon" :class="{ [`s-icon--${type}`]: type }" :style="customStyles" v-bind="$attrs">
    <font-awesome-icon v-bind="filteredProps" />
  </i>
</template>

<script setup lang="ts">
import { omit } from 'lodash-es'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { FontAwesomeIconProps } from './types'
import { computed } from 'vue'

defineOptions({
  name: 'S-Icon',
  inheritAttrs: false
})
const props = defineProps<FontAwesomeIconProps>()
const filteredProps = computed(() => omit(props, ['type', 'color']))
const customStyles = computed(() => {
  return props.color ? { color: props.color } : {}
})
</script>

<style scoped></style>
