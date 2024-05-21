<script setup>
import { ref } from 'vue'
import Switch from '@/components/Switch/Switch.vue'
const test = ref(true)
</script>
<template>
  <Switch v-model="test" />
</template>
<style scoped>
.s-switch {
  --s-switch-on-color:#13ce66;
  --s-switch-off-color:#ff4949
}
</style>