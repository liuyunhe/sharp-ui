<template>
  <div
    class="s-switch"
    :class="{
      [`s-switch--${size}`]: size,
      'is-disabled': disabled,
      'is-checked': checked
    }"
    @click="switchValue" 
  >
    <input
      class="s-switch__input"
      type="checkbox"
      role="switch"
      ref="input"
      :name="name"
      :disabled="disabled"
      @keydown.enter="switchValue"
    />
    <div class="s-switch__core">
      <div class="s-switch__core-inner">
        <span v-if="activeText || inactiveText" class="s-switch__core-inner-text">
          {{ checked ? activeText : inactiveText }}
        </span>
      </div>
      <div class="s-switch__core-action"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import type { SwitchProps, SwitchEmits } from './types'
defineOptions({ name: 'SSwitch', inheritAttrs: false })

// 定义组件接收的 props
const props = withDefaults(defineProps<SwitchProps>(), {
  activeValue: true, // 开启状态的值
  inactiveValue: false // 关闭状态的值
})

// 定义组件发出的事件
const emits = defineEmits<SwitchEmits>()

// 创建一个 input 元素的引用
const input = ref<HTMLInputElement>()

// 使用 ref 来跟踪开关的内部值
const innerValue = ref(props.modelValue)

// 计算当前是否被选中
const checked = computed(() => innerValue.value === props.activeValue)

// 切换开关状态的逻辑
const switchValue = () => {
  if (props.disabled) return // 如果设置了 disabled，则不进行任何操作
  const newValue = checked.value ? props.inactiveValue : props.activeValue
  innerValue.value = newValue
  emits('update:modelValue', newValue) // 更新父组件绑定的值
  emits('change', newValue) // 发出 change 事件
}

// 在组件挂载时，设置 input 元素的 checked 状态
onMounted(() => {
  input.value!.checked = checked.value
})

// 监听 checked 的变化，更新 input 元素的 checked 状态
watch(checked, (val) => {
  input.value!.checked = val
})

// 监听 props.modelValue 的变化，更新 innerValue 的值
watch(
  () => props.modelValue,
  (newValue) => {
    innerValue.value = newValue
  }
)
</script>

<style scoped></style>