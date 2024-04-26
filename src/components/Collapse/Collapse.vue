<template>
  <div class="s-collapse">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, ref, watch } from 'vue'
import { collapseContextKey, type CollapseEmits, type CollapseProps, type NameType } from './types'

defineOptions({
  name: 'S-Collapse'
})
const props = defineProps<CollapseProps>()
const emits = defineEmits<CollapseEmits>()

// 使用ref来创建一个响应式数组，初始值为props的modelValue
const activeNames = ref<NameType[]>(props.modelValue)

// 监听activeNames的值变化，同步更新props的modelValue的值
watch(
  () => props.modelValue,
  () => {
    activeNames.value = props.modelValue
  }
)

 // 如果启用手风琴模式且有多个活动项，给出警告
if (props.accordion && activeNames.value.length > 1) {
  console.warn('accordion mode should only have one acitve item')
}

// 处理面板点击事件
const handleItemClick = (item: NameType) => {
  const index = activeNames.value.indexOf(item)
  if (props.accordion) {
     // 手风琴模式下，只允许一个面板活动，点击时切换状态
    activeNames.value = [activeNames.value[0] === item ? '' : item]
  } else {
     // 非手风琴模式下，点击活动面板取消其活动状态，点击非活动面板将其设置为活动状态
    if (index > -1) {
      // 当前点击的面板已是活动状态，则移除
      // 存在，删除数组对应的一项
      activeNames.value.splice(index, 1)
    } else {
      // 当前点击的面板为非活动状态，则添加
      // 不存在，插入对应的name
      activeNames.value.push(item)
    }
  }

   // 触发更新modelValue的事件，以及面板状态变化的事件
  emits('update:modelValue', activeNames.value)
  emits('change', activeNames.value)
}

// 提供activeNames和handleItemClick给子组件使用
provide(collapseContextKey, {
  activeNames,
  handleItemClick
})
</script>

<style scoped></style>
