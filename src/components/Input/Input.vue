<template>
  <div
    class="s-input"
    :class="{
      [`vk-input--${type}`]: type,
      [`vk-input--${size}`]: size,
      'is-disabled': disabled,
      'is-prepend': $slots.prepend,
      'is-append': $slots.append,
      'is-prefix': $slots.prefix,
      'is-suffix': $slots.suffix
    }"
  >
    <!-- input -->
    <template v-if="type !== 'textarea'">
      <!-- prepend -->
      <div v-if="$slots.prepend" class="s-input__prepend">
        <slot name="prepend"></slot>
      </div>
      <div class="s-input__wrapper">
        <!-- prefix -->
        <span v-if="$slots.prefix" class="s-input__prefix">
          <slot name="prefix"></slot>
        </span>
        <!-- input -->
        <input class="s-input" :disabled="disabled" />
        <!-- suffix -->
        <span v-if="$slots.suffix" class="s-input__suffix">
          <slot name="suffix"></slot>
        </span>
      </div>
      <!-- append -->
      <div v-if="$slots.append" class="s-input__append">
        <slot name="append"></slot>
      </div>
    </template>
    <!-- textarea -->
    <template v-else>
      <textarea class="s-textarea__wrapper" :disabled="disabled"></textarea>
    </template>
  </div>
</template>

<script setup lang="ts">
import { type InputProps } from './types'
defineOptions({
  name: 'S-Input'
})

withDefaults(defineProps<InputProps>(), {
  type: 'text'
})
</script>

<style scoped></style>
