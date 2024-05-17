<template>
  <div
    class="s-input"
    :class="{
      [`s-input--${type}`]: type,
      [`s-input--${size}`]: size,
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
      <div class="s-input__wrapper" :class="{ 'is-focus': isFocus }">
        <!-- prefix -->
        <span v-if="$slots.prefix" class="s-input__prefix">
          <slot name="prefix"></slot>
        </span>
        <!-- input -->
        <input
          class="s-input__inner"
          :type="type"
          :placeholder="placeholder"
          :disabled="disabled"
          v-model="innerValue"
          @input="handleInput"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <!-- suffix -->
        <span v-if="$slots.suffix || showClear || showPasswordArea" class="s-input__suffix">
          <slot name="suffix"></slot>
          <Icon icon="circle-xmark" v-if="showClear" class="s-input__clear" @click="clear" />
          <Icon
            icon="eye"
            v-if="showPasswordArea && passwordVisible"
            class="s-input__password"
            @click="togglePasswordVisible"
          />
          <Icon
            icon="eye-slash"
            v-if="showPasswordArea && !passwordVisible"
            class="s-input__password"
            @click="togglePasswordVisible"
          />
        </span>
      </div>
      <!-- append -->
      <div v-if="$slots.append" class="s-input__append">
        <slot name="append"></slot>
      </div>
    </template>
    <!-- textarea -->
    <template v-else>
      <textarea
        class="s-textarea__wrapper"
        :disabled="disabled"
        v-model="innerValue"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      ></textarea>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { type InputProps, type InputEmits } from './types'
import Icon from '@/components/Icon/Icon.vue'
defineOptions({
  name: 'S-Input'
})

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text'
})
const innerValue = ref(props.modelValue)
const isFocus = ref(false)
const passwordVisible = ref(false)

const type = computed(() => {
  return props.showPassword || props.type === 'password'
    ? passwordVisible.value
      ? 'text'
      : 'password'
    : props.type
})

const emits = defineEmits<InputEmits>()

const handleInput = (e: Event) => {
  emits('update:modelValue', innerValue.value)
  emits('input', innerValue.value)
}
const handleChange = (e: Event) => {
  emits('change', innerValue.value)
}

const showClear = computed(() => {
  return props.clearable && !!innerValue.value && !props.disabled && isFocus.value
})

const showPasswordArea = computed(() => {
  return (props.showPassword || props.type === 'password') && !props.disabled && !!innerValue.value
})

const togglePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value
}

const handleFocus = (e: FocusEvent) => {
  isFocus.value = true
  emits('focus', e)
}

const handleBlur = (e: FocusEvent) => {
  isFocus.value = false
  emits('blur', e)
}

const clear = () => {
  innerValue.value = ''
  emits('update:modelValue', '')
  emits('clear')
  emits('input', '')
  emits('change', '')
}

watch(
  () => props.modelValue,
  (newValue) => {
    innerValue.value = newValue
  }
)
</script>

<style scoped></style>
