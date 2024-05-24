<template>
  <div
    class="s-input"
    :class="{
      // 根据类型和尺寸动态添加类名
      [`s-input--${type}`]: type,
      [`s-input--${size}`]: size,
      // 添加禁用、前缀、后缀等状态类名
      'is-disabled': disabled,
      'is-prepend': $slots.prepend,
      'is-append': $slots.append,
      'is-prefix': $slots.prefix,
      'is-suffix': $slots.suffix
    }"
  >
    <!-- 输入框或文本域元素，根据'type'属性条件渲染 -->
    <template v-if="type !== 'textarea'">
      <!-- prepend-前置插槽，用于在输入框前插入自定义内容 -->
      <div v-if="$slots.prepend" class="s-input__prepend">
        <slot name="prepend"></slot>
      </div>
      <!-- 输入框容器，包含前后缀、清除和密码显示切换等功能 -->
      <div class="s-input__wrapper" :class="{ 'is-focus': isFocus }">
        <!-- prefix-前缀插槽 -->
        <span v-if="$slots.prefix" class="s-input__prefix">
          <slot name="prefix"></slot>
        </span>
        <!-- input-主输入框 -->
        <input
          ref="inputRef"
          class="s-input__inner"
          v-bind="attrs"
          :type="type"
          :disabled="disabled"
          v-model="innerValue"
          :readonly="readonly"
          :autocomplete="autocomplete"
          :placeholder="placeholder"
          :autofocus="autofocus"
          :form="form"
          @input="handleInput"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <!-- suffix-后缀区域，包含清除图标、密码切换图标及后缀插槽 -->
        <span
          v-if="$slots.suffix || showClear || showPasswordArea"
          class="s-input__suffix"
          @click="keepFocus"
        >
          <slot name="suffix"></slot>
          <!-- 清除图标 -->
          <Icon
            icon="circle-xmark"
            v-if="showClear"
            class="s-input__clear"
            @click="clear"
            @mousedown.prevent="NOOP"
          />
          <!-- 密码显示/隐藏图标 -->
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
      <!-- append-后置插槽，用于在输入框后插入自定义内容 -->
      <div v-if="$slots.append" class="s-input__append">
        <slot name="append"></slot>
      </div>
    </template>
    <!-- textarea-文本域组件，当'type'为'textarea'时渲染 -->
    <template v-else>
      <textarea
        ref="inputRef"
        class="s-textarea__wrapper"
        v-bind="attrs"
        :disabled="disabled"
        v-model="innerValue"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :form="form"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      ></textarea>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, nextTick, ref, useAttrs, watch } from 'vue'
import { type InputProps, type InputEmits } from './types' // 输入组件的类型声明
import Icon from '@/components/Icon/Icon.vue' // 图标组件导入
import { formItemContextKey } from '../Form/types'; // 表单项上下文密钥导入
defineOptions({
  name: 'S-Input', // 组件名称
  inheritAttrs: false // 不继承父组件的属性
})

// 定义props和内部状态
const props = withDefaults(defineProps<InputProps>(), {
  autocomplete: 'off', // 自动填充默认关闭
  type: 'text' // 默认输入类型为文本
})
const attrs = useAttrs() // 获取外部传入的属性
const innerValue = ref(props.modelValue) // 内部值，用于双向绑定
const isFocus = ref(false) // 聚焦状态标志
const passwordVisible = ref(false) // 密码可见性标志

// 输入/文本域元素的引用
const inputRef = ref<HTMLInputElement>()

// 表单项验证上下文
const formItemContext = inject(formItemContextKey)
const runValidation = (trigger?: string) => {
  formItemContext?.validate(trigger).catch((e) => console.log(e.errors))
}

// 计算属性处理输入类型和密码显示/隐藏图标的状态
const type = computed(() => {
  return props.showPassword || props.type === 'password'
    ? passwordVisible.value
      ? 'text'
      : 'password'
    : props.type
})

const emits = defineEmits<InputEmits>() // 定义事件派发

const NOOP = () => {} // 空操作函数

// 事件处理器：输入、变化、聚焦、失焦
const handleInput = (e: Event) => {
  emits('update:modelValue', innerValue.value)
  emits('input', innerValue.value)
  runValidation('input')
}
const handleChange = (e: Event) => {
  emits('change', innerValue.value)
  runValidation('change')
}

// 显示清除按钮的条件
const showClear = computed(() => {
  return props.clearable && !!innerValue.value && !props.disabled && isFocus.value
})

// 显示密码区域（包括切换图标）的条件
const showPasswordArea = computed(() => {
  return (props.showPassword || props.type === 'password') && !props.disabled && !!innerValue.value
})

// 密码可见性切换函数
const togglePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value
}

// 保持焦点的辅助函数
const keepFocus = async () => {
  await nextTick()
  inputRef.value?.focus()
}

// 聚焦和失焦事件处理
const handleFocus = (e: FocusEvent) => {
  isFocus.value = true
  emits('focus', e)
}
const handleBlur = (e: FocusEvent) => {
  console.log('失去焦点触发')
  isFocus.value = false
  emits('blur', e)
  runValidation('blur')
}

// 清除输入框内容
const clear = () => {
  console.log('清除触发')
  innerValue.value = ''
  emits('update:modelValue', '')
  emits('clear')
  emits('input', '')
  emits('change', '')
}

// 监听modelValue变化，同步内部值
watch(
  () => props.modelValue,
  (newValue) => {
    innerValue.value = newValue
  }
)

// 暴露inputRef供外部使用
defineExpose({
  ref: inputRef
})
</script>

<style scoped></style>