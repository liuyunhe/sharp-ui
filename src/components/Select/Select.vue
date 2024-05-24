<template>
  <!-- Select组件的外层容器，管理选中状态、禁用状态和下拉菜单的显示 -->
  <div
    class="s-select"
    :class="{ 'is-disabled': disabled }"
    @click="toggleDropdown"
    @mouseenter="states.mouseHover = true"
    @mouseleave="states.mouseHover = false"
  >
    <!-- 使用Tooltip组件提供下拉菜单的显示和隐藏，并处理外部点击 -->
    <Tooltip
      placement="bottom-start"
      ref="tooltipRef"
      :popperOptions="popperOptions"
      @click-outside="controlDropdown(false)"
      manual
    >
      <!-- 输入框，管理用户输入和选中项的显示 -->
      <Input
        v-model="states.inputValue"
        :disabled="disabled"
        :placeholder="filteredPlaceholder"
        ref="inputRef"
        :readonly="!filterable || !isDropdownShow"
        @input="debouceOnFilter"
        @keydown="handleKeydown"
      >
        <!-- 输入框后缀，展示清除图标或下拉箭头 -->
        <template #suffix>
          <Icon
            icon="circle-xmark"
            v-if="showClearIcon"
            class="s-input__clear"
            @mousedown.prevent="NOOP"
            @click.stop="onClear"
          />

          <Icon
            v-else
            icon="angle-down"
            class="header-angle"
            :class="{ 'is-active': isDropdownShow }"
          />
        </template>
      </Input>
      <!-- 提供下拉内容，包括加载状态、无数据状态和选项列表 -->
      <template #content>
        <div class="s-select__loading" v-if="states.loading"><Icon icon="spinner" spin /></div>
        <div class="s-select__nodata" v-else-if="filterable && filteredOptions.length === 0">
          no matching data
        </div>
        <ul class="s-select__menu" v-else>
          <template v-for="(item, index) in filteredOptions" :key="index">
            <li
              class="s-select__menu-item"
              :class="{
                'is-disabled': item.disabled,
                'is-selected': states.selectedOption?.value === item.value,
                'is-highlighted': states.highlightIndex === index
              }"
              :id="`select-item-${item.value}`"
              @click.stop="itemSelect(item)"
            >
              <RenderVnode :vNode="renderLabel ? renderLabel(item) : item.label" />
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import type { Ref } from 'vue'
import { isFunction, debounce } from 'lodash-es'
import type { SelectProps, SelectEmits, SelectOption, SelectStates } from './types'
import Tooltip from '../Tooltip/Tooltip.vue'
import type { TooltipInstance } from '../Tooltip/types'
import Input from '../Input/Input.vue'
import Icon from '../Icon/Icon.vue'
import RenderVnode from '../Common/RenderVnode'
import type { InputInstance } from '../Input/types'

// 根据值查找选项
const findOption = (value: string) => {
  const option = props.options.find((option) => option.value === value)
  return option ? option : null
}
// 定义组件内部使用的props、emits和初始状态
defineOptions({
  name: 'S-Select'
})
const props = withDefaults(defineProps<SelectProps>(), {
  disabled: false,
  placeholder: '请选择',
  options: () => []
})
const timeout = computed(() => (props.remote ? 300 : 0))
const emits = defineEmits<SelectEmits>()
const initialOption = findOption(props.modelValue)
const tooltipRef = ref() as Ref<TooltipInstance>
const inputRef = ref() as Ref<InputInstance>
const states = reactive<SelectStates>({
  inputValue: initialOption ? initialOption.label : '', // 根据是否有初始选项设置输入框的值
  selectedOption: initialOption, // 设置初始选中的选项
  mouseHover: false, // 鼠标是否悬停在选择器上
  loading: false, // 选择器是否处于加载状态
  highlightIndex: -1 // 高亮选项的索引，默认为-1表示无选项被高亮
})
const isDropdownShow = ref(false)
const popperOptions: any = {
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 9]
      }
    },
    {
      name: 'sameWidth',
      enabled: true,
      fn: ({ state }: { state: any }) => {
        state.styles.popper.width = `${state.rects.reference.width}px`
      },
      phase: 'beforeWrite',
      requires: ['computeStyles']
    }
  ]
}
const filteredOptions = ref(props.options)
// 监听props.options变化，更新filteredOptions
watch(
  () => props.options,
  (newOptions) => {
    filteredOptions.value = newOptions
  }
)
// 根据当前输入过滤选项
const generateFilterOptions = async (searchValue: string) => {
  if (!props.filterable) return
  if (props.filterMethod && isFunction(props.filterMethod)) {
    filteredOptions.value = props.filterMethod(searchValue)
  } else if (props.remote && props.remoteMethod && isFunction(props.remoteMethod)) {
    states.loading = true
    try {
      filteredOptions.value = await props.remoteMethod(searchValue)
    } catch (e) {
      console.error(e)
      filteredOptions.value = []
    } finally {
      states.loading = false
    }
  } else {
    filteredOptions.value = props.options.filter((option) => option.label.includes(searchValue))
  }
  states.highlightIndex = -1
}
// 处理输入框值变化，触发选项过滤
const onFilter = () => {
  generateFilterOptions(states.inputValue)
}
// 声明一个防抖函数，用于延迟选项过滤操作
const debouceOnFilter = debounce(() => {
  onFilter()
}, timeout.value)
// 计算输入框的placeholder，考虑filterable和已选择项的情况
const filteredPlaceholder = computed(() => {
  return props.filterable && states.selectedOption && isDropdownShow.value
    ? states.selectedOption.label
    : props.placeholder
})
// 控制下拉菜单的显示和隐藏，并处理相关的逻辑
const controlDropdown = (show: boolean) => {
  console.log('🚀 ~ controlDropdown ~ show:', show)
  if (show) {
    // 在filter模式下进行初始化操作
    if (props.filterable && states.selectedOption) {
      states.inputValue = ''
    }
    if (props.filterable) {
      generateFilterOptions(states.inputValue)
    }
    tooltipRef.value.show()
  } else {
    tooltipRef.value.hide()
    // 失去焦点时的处理逻辑
    if (props.filterable) {
      states.inputValue = states.selectedOption ? states.selectedOption.label : ''
    }
    states.highlightIndex = -1
  }
  isDropdownShow.value = show
  emits('visible-change', show)
}
// 处理键盘事件
const handleKeydown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'Enter':
      // 处理回车键事件
      if (!isDropdownShow.value) {
        controlDropdown(true)
      } else {
        if (states.highlightIndex > -1 && filteredOptions.value[states.highlightIndex]) {
          itemSelect(filteredOptions.value[states.highlightIndex])
        } else {
          controlDropdown(false)
        }
      }
      break
    case 'Escape':
      // 处理Escape键事件，隐藏下拉菜单
      if (isDropdownShow.value) {
        controlDropdown(false)
      }
      break
    case 'ArrowUp':
      // 处理向上箭头事件，选择上一个选项
      e.preventDefault()
      if (filteredOptions.value.length > 0) {
        if (states.highlightIndex === -1 || states.highlightIndex === 0) {
          states.highlightIndex = filteredOptions.value.length - 1
        } else {
          states.highlightIndex--
        }
      }
      break
    case 'ArrowDown':
      // 处理向下箭头事件，选择下一个选项
      e.preventDefault()
      if (filteredOptions.value.length > 0) {
        if (
          states.highlightIndex === -1 ||
          states.highlightIndex === filteredOptions.value.length - 1
        ) {
          states.highlightIndex = 0
        } else {
          states.highlightIndex++
        }
      }
      break
    default:
      break
  }
}
// 计算是否显示清除图标
const showClearIcon = computed(() => {
  return (
    props.clearable && states.mouseHover && states.selectedOption && states.inputValue.trim() !== ''
  )
})
// 处理清除选中项的操作
const onClear = () => {
  states.selectedOption = null
  states.inputValue = ''
  emits('clear')
  emits('change', '')
  emits('update:modelValue', '')
}
const NOOP = () => {}
const toggleDropdown = () => {
  if (props.disabled) return
  if (isDropdownShow.value) {
    controlDropdown(false)
  } else {
    controlDropdown(true)
  }
}
const itemSelect = (e: SelectOption) => {
  if (e.disabled) return
  states.inputValue = e.label
  states.selectedOption = e
  emits('change', e.value)
  emits('update:modelValue', e.value)
  controlDropdown(false)
  inputRef.value.ref.focus()
}
</script>
