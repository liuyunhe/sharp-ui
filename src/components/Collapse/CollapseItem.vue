<template>
  <div
    class="s-collapse-item"
    :class="{
      'is-disabled': disabled
    }"
  >
    <div
      class="s-collapse-item__header"
      :class="{
        'is-disabled': disabled,
        'is-active': isActive
      }"
      :id="`item-header-${name}`"
      @click="handleClick"
    >
      <slot name="title">
        {{ title }}
      </slot>
       <Icon icon="angle-right" class="header-angle" />
    </div>
    <Transition name="slide" v-on="transitionEvants">
      <div class="s-collapse-item__wrapper" v-show="isActive">
        <div class="s-collapse-item__content" :id="`item-content-${name}`">
          <slot></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { collapseContextKey, type CollapseItemProps } from './types'
import Icon from '../Icon/Icon.vue'
defineOptions({
  name: 'SCollapseItem'
})

// 获取传入的组件属性
const props = defineProps<CollapseItemProps>()

// 从父组件中注入collapse的上下文
const collapseContext = inject(collapseContextKey)

// 计算当前项是否处于活动状态
const isActive = computed(() => {
  return collapseContext?.activeNames.value.includes(props.name)
})

// 处理点击事件
const handleClick = () => {
  if (props.disabled) return
  collapseContext?.handleItemClick(props.name)
}

// 定义过渡状态的钩子函数
const transitionEvants: Record<string, (el: HTMLElement) => void> = {
  beforeEnter(el) {
    el.style.height = '0px'
    el.style.overflow = 'hidden'
  },
  enter(el) {
    el.style.height = el.scrollHeight + 'px'
  },
  afterEnter(el) {
    el.style.height = ''
    el.style.overflow = ''
  },
  beforeLeave(el) {
    el.style.height = el.scrollHeight + 'px'
    el.style.overflow = 'hidden'
  },
  leave(el) {
    el.style.height = '0px'
  },
  afterLeave(el) {
    el.style.height = ''
    el.style.overflow = ''
  }
}
</script>

<style scoped></style>
