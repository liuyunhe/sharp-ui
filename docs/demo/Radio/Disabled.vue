<template>
  <s-radio disabled v-model="radio" value="1">备选项</s-radio>
  <s-radio disabled v-model="radio" value="2">备选项</s-radio>
</template>

<script setup>
import SRadio from '@/components/Radio'
import { ref } from 'vue'
const radio = ref('1')
</script>

<style lang="scss" scoped></style>
