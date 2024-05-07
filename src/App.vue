<template>
  <header>
    <Tooltip
      ref="tooltipRef"
      placement="right"
      :popper-options="popperOptions"
      :trigger="trigger"
      :open-delay="1000"
      :close-delay="1000"
    >
      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
      <template #content>
        <div>Hello Tooltip</div>
      </template>
    </Tooltip>
  </header>
  <div style="margin-bottom: 20px">
    <Button type="primary" @click="open">打开Tooltip</Button>
    <Button @click="close">关闭Tooltip</Button>
  </div>
  <Icon icon="arrow-up" :size="size" type="danger" color="#0e7a0d" spin />
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
import { onMounted, ref } from 'vue'
import Button from '@/components/Button/Button.vue'
import Icon from './components/Icon/Icon.vue'
import Collapse from '@/components/Collapse/Collapse.vue'
import CollapseItem from '@/components/Collapse/CollapseItem.vue'
import type { ButtonInstance } from './components/Button/types'
import Tooltip from '@/components/Tooltip/Tooltip.vue'
import type { TooltipInstance } from './components/Tooltip/types'
import type { Options as PopperOptions } from '@popperjs/core'

const buttonRef = ref<ButtonInstance | null>(null)
const tooltipRef = ref<TooltipInstance | null>(null)

const openedValue = ref(['a'])

const size = ref<any>('3x')

const trigger = ref<any>('hover')

const popperOptions: Partial<PopperOptions> = {
  placement: 'right-end',
  strategy: 'fixed'
}

const open = () => {
  tooltipRef.value?.show()
}
const close = () => {
  tooltipRef.value?.hide()
}

onMounted(() => {
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
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
