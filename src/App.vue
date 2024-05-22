<template>
  <header>
    <div style="margin-bottom: 20px">
      <Tooltip
        ref="tooltipRef"
        placement="right"
        :popper-options="popperOptions"
        :trigger="trigger"
        :open-delay="200"
        :close-delay="200"
      >
        <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
        <template #content>
          <div>Hello Tooltip</div>
        </template>
      </Tooltip>
    </div>
  </header>
  <div style="margin-bottom: 20px">
    <Button type="primary" @click="open">打开Tooltip</Button>
    <Button @click="close">关闭Tooltip</Button>
  </div>
  <div style="margin-bottom: 20px">
    <Dropdown
      ref="dropdownRef"
      :menu-options="menuOptions"
      trigger="click"
      :open-delay="100"
      :close-delay="100"
      manual
      @visible-change="(e) => inlineConsole('visible change', e)"
      @select="(e) => inlineConsole('select', e)"
    >
      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
    </Dropdown>
  </div>
  <div style="margin-bottom: 20px">
    <Button type="primary" @click="openDropdown">打开Dropdown</Button>
    <Button @click="closeDropdown">关闭Dropdown</Button>
  </div>
  <div style="margin-bottom: 20px">
    <Icon icon="arrow-up" :size="size" type="danger" color="#0e7a0d" spin />
  </div>
  <main>
    <div style="margin-bottom: 20px">
      <Button ref="buttonRef">默认按钮</Button>
      <Button type="primary">主要按钮</Button>
      <Button type="success">成功按钮</Button>
      <Button type="info">信息按钮</Button>
      <Button type="warning">警告按钮</Button>
      <Button type="danger">危险按钮</Button>
    </div>
    <div style="margin-bottom: 20px">
      <Button plain>朴素按钮</Button>
      <Button type="primary" plain>主要按钮</Button>
      <Button type="success" plain>成功按钮</Button>
      <Button type="info" plain>信息按钮</Button>
      <Button type="warning" plain>警告按钮</Button>
      <Button type="danger" plain>危险按钮</Button>
    </div>
    <div style="margin-bottom: 20px">
      <Button round>圆角按钮</Button>
      <Button type="primary" round>主要按钮</Button>
      <Button type="success" round>成功按钮</Button>
      <Button type="info" round>信息按钮</Button>
      <Button type="warning" round>警告按钮</Button>
      <Button type="danger" round>危险按钮</Button>
    </div>
    <div style="margin-bottom: 20px">
      <Button size="small">small</Button>
      <Button type="primary" size="large">large</Button>
      <Button type="success" disabled>成功按钮</Button>
      <Button type="info" loading>信息按钮</Button>
    </div>
    <div style="margin-bottom: 20px; width: 300px">
      <Input v-model="inputValue" show-password clearable></Input>
    </div>
    <div style="margin-bottom: 20px">
      <Switch
        v-model="switchValue"
        active-value="1"
        inactive-value="0"
        active-text="打开"
        inactive-text="关闭"
        @change="(e) => inlineConsole('switch change', e)"
      ></Switch>
    </div>
    <div style="margin-bottom: 20px">
      <Select
        v-model="selectValue"
        :options="selectOptions"
        @change="(e) => inlineConsole('select change', e)"
        @visible-change="(e) => inlineConsole('select visible change', e)"
      ></Select>
    </div>
    <div style="margin-bottom: 20px">
      <Collapse v-model="openedValue" accordion>
        <CollapseItem name="a">
          <template #title>
            <h1>Title A</h1>
          </template>
          <h1>headline title</h1>
          <div>this is content a aaa</div>
        </CollapseItem>
        <CollapseItem name="b" title="Title B">
          <div>this is bbbbb test</div>
        </CollapseItem>
        <CollapseItem name="c" title="Disabled Title" disabled>
          <div>this is cccc test</div>
        </CollapseItem>
      </Collapse>
      {{ openedValue }}
    </div>
  </main>
</template>

<script setup lang="ts">
import { h, nextTick, onMounted, ref } from 'vue'
import Button from '@/components/Button/Button.vue'
import Icon from './components/Icon/Icon.vue'
import Collapse from '@/components/Collapse/Collapse.vue'
import CollapseItem from '@/components/Collapse/CollapseItem.vue'
import type { ButtonInstance } from './components/Button/types'
import Tooltip from '@/components/Tooltip/Tooltip.vue'
import type { TooltipInstance } from './components/Tooltip/types'
import type { Options as PopperOptions } from '@popperjs/core'
import Dropdown from '@/components/Dropdown/Dropdown'
import Input from '@/components/Input/Input.vue'
import Switch from '@/components/Switch/Switch.vue'
import Select from '@/components/Select/Select.vue'
import type { DropdownInstance, MenuOption } from '@/components/Dropdown/types'
// import Message from '@/components/Message/Message.vue'
import { createMessage } from '@/components/Message/methods'

const buttonRef = ref<ButtonInstance | null>(null)
const tooltipRef = ref<TooltipInstance | null>(null)
const dropdownRef = ref<DropdownInstance | null>(null)

const openedValue = ref(['a'])

const size = ref<any>('3x')

const trigger = ref<any>('hover')

const inputValue = ref('hello word!')

const switchValue = ref('1')

const selectValue = ref('')

const selectOptions = ref([
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' }
])

const popperOptions: Partial<PopperOptions> = {
  placement: 'right-end',
  strategy: 'fixed'
}

const openDropdown = () => {
  dropdownRef.value?.show()
}
const closeDropdown = () => {
  dropdownRef.value?.hide()
}

const open = () => {
  tooltipRef.value?.show()
}
const close = () => {
  tooltipRef.value?.hide()
}

const inlineConsole = (...args: any) => {
  console.log(...args)
}

const menuOptions: MenuOption[] = [
  { key: 1, label: h('b', 'this is bold') },
  { key: 2, label: 'item2', disabled: true },
  { key: 3, label: 'item3', divided: true },
  { key: 4, label: 'item4' }
]

onMounted(() => {
  const instance = createMessage({
    type: 'warning',
    message: 'hello word',
    showClose: true
  })
  nextTick(() => {
    console.log('🚀 ~ onMounted ~ instance:', instance)
  })
  createMessage({ type: 'success', message: 'hello word', showClose: true })
  createMessage({ type: 'danger', message: 'hello word', showClose: true })
  if (buttonRef.value) {
    console.log('🚀 ~ onMounted ~ buttonRef.value:', buttonRef.value)
    console.log('🚀 ~ onMounted ~ buttonRef.value.ref:', buttonRef.value.ref)
  }
  setTimeout(() => {
    openedValue.value = ['a', 'b']
    size.value = '2xl'
  }, 2000)
})
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
