<template>
  <button
    ref="_ref"
    class="s-button"
    :class="{
      [`s-button--${type}`]: type,
      [`s-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading
    }"
    :disabled="disabled"
    :autofocus="autofocus"
    :type="nativeType"
  >
    <span>
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ButtonProps } from './types'
defineOptions({
  name: 'S-Button'
})
/**
 * 默认属性
 * @see https://cn.vuejs.org/api/sfc-script-setup.html#defineprops
 */
withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button'
})


const _ref = ref<HTMLButtonElement>()

defineExpose({
  ref: _ref
})
</script>

<style scoped></style>
