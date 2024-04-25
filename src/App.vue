<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
  </header>

  <main>
    <div style="margin-bottom: 20px;">
      <Button>默认按钮</Button>
      <Button type="primary">主要按钮</Button>
      <Button type="success">成功按钮</Button>
      <Button type="info">信息按钮</Button>
      <Button type="warning">警告按钮</Button>
      <Button type="danger">危险按钮</Button>
    </div>
    <div style="margin-bottom: 20px;">
      <Button plain>朴素按钮</Button>
      <Button type="primary" plain>主要按钮</Button>
      <Button type="success" plain>成功按钮</Button>
      <Button type="info" plain>信息按钮</Button>
      <Button type="warning" plain>警告按钮</Button>
      <Button type="danger" plain>危险按钮</Button>
    </div>
    <div style="margin-bottom: 20px;">
      <Button round>圆角按钮</Button>
      <Button type="primary" round>主要按钮</Button>
      <Button type="success" round>成功按钮</Button>
      <Button type="info" round>信息按钮</Button>
      <Button type="warning" round>警告按钮</Button>
      <Button type="danger" round>危险按钮</Button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Button from '@/components/Button/Button.vue'
import type { ButtonInstance } from './components/Button/types'

const buttonRef = ref<ButtonInstance | null>(null)
onMounted(() => {
  if (buttonRef.value) {
    console.log('🚀 ~ onMounted ~ buttonRef.value:', buttonRef.value)
    console.log('🚀 ~ onMounted ~ buttonRef.value.ref:', buttonRef.value.ref)
  }
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
