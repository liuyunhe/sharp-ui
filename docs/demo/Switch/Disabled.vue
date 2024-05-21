<script setup>
import { ref } from 'vue'
import Switch from '@/components/Switch/Switch.vue'
const test = ref(true)
const test2 = ref(false)
</script>
<template>
  <div class="demo-switch-container">
    <div class="demo-switch-container-title">正常：</div>
    <Switch v-model="test" /> <br/>
  </div>
  <div class="demo-switch-container">
    <div class="demo-switch-container-title">禁用：</div>
    <Switch v-model="test2" disabled/>
  </div>
</template>
<style scoped>
  .demo-switch-container {
    display: flex;
    align-items: center;
  }
</style>