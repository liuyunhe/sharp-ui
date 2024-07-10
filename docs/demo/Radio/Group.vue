<template>
  <s-radio-group v-model="radio">
    <s-radio value="1">备选项</s-radio>
    <s-radio value="2">备选项</s-radio>
    <s-radio value="3">备选项</s-radio>
  </s-radio-group>
</template>

<script setup>
import SRadio, { SRadioGroup} from '@/components/Radio'
import { ref } from 'vue'
const radio = ref('1')
</script>

<style lang="scss" scoped></style>
 