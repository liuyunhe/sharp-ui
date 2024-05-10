<template>
  <div class="s-dropdown">
    <Tooltip
      :trigger="trigger"
      :placement="placement"
      :popper-options="popperOptions"
      :open-delay="openDelay"
      :close-delay="closeDelay"
      @visible-change="visibleChange"
      ref="tooltipRef"
    >
      <slot></slot>
      <template #content>
        <ul class="s-dropdown__menu">
          <template v-for="item in menuOptions" :key="item.key">
            <li v-if="item.divided" role="separator" class="divided-placeholder"></li>
            <li
              class="s-dropdown__item"
              :class="{ 'is-disabled': item.disabled, 'is-divided': item.divided }"
              :id="`dropdown-item-${item.key}`"
              @click="($event) => itemClick(item)"
            >
              <RenderVnode :vNode="item.label" />
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import type { DropdownProps, DropdownInstance, DropdownEmits, MenuOption } from './types'
import Tooltip from '../Tooltip/Tooltip.vue'
import type { TooltipInstance } from '../Tooltip/types'
import RenderVnode from '@/components/Common/RenderVnode'
import { ref, type Ref } from 'vue'

defineOptions({
  name: 'S-Dropdown'
})

const porps = withDefaults(defineProps<DropdownProps>(), { hideAfterClick: true })
const emits = defineEmits<DropdownEmits>()

const tooltipRef = ref() as Ref<TooltipInstance | undefined>

const visibleChange = (e: boolean) => {
  emits('visible-change', e)
}

const itemClick = (e: MenuOption) => {
  if (e.disabled) return
  emits('select', e)
  if(porps.hideAfterClick) tooltipRef.value?.hide()
}

defineExpose<DropdownInstance>({
  show: () => tooltipRef.value?.show(),
  hide: () => tooltipRef.value?.hide()
})
</script>

<style scoped></style>
