<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
  </header>

  <main>
    <Button ref="buttonRef" type="primary" plain disabled>Test Button</Button>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Button from '@/components/Button/Button.vue'
import type { ButtonInstance } from './components/Button/types'

const buttonRef = ref<ButtonInstance | null>(null)
onMounted(() => {
  if(buttonRef.value) {
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
