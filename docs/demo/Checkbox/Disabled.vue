<template>
  <s-checkbox v-model="checked1" disabled>Disabled</s-checkbox>
  <s-checkbox v-model="checked2">Not disabled</s-checkbox>
</template>

<script setup>
import SCheckbox from '@/components/Checkbox'
import { ref } from 'vue'

const checked1 = ref(true)
const checked2 = ref(false)
</script>

<style lang="scss" scoped>

</style>