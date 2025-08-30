<template>
  <div>
    <s-radio v-model="radio1" value="1" border>备选项1</s-radio>
    <s-radio v-model="radio1" value="2" border>备选项2</s-radio>
  </div>
  <div style="margin-top: 20px">
    <s-radio v-model="radio2" value="1" border size="medium">备选项1</s-radio>
    <s-radio v-model="radio2" value="2" border size="medium">备选项2</s-radio>
  </div>
  <div style="margin-top: 20px">
    <s-radio-group v-model="radio3" size="small">
      <s-radio value="1" border>备选项1</s-radio>
      <s-radio value="2" border disabled>备选项2</s-radio>
    </s-radio-group>
  </div>
  <div style="margin-top: 20px">
    <s-radio-group v-model="radio4" size="mini" disabled>
      <s-radio value="1" border>备选项1</s-radio>
      <s-radio value="2" border>备选项2</s-radio>
    </s-radio-group>
  </div>
</template>

<script setup>
import SRadio, { SRadioGroup} from '@/components/Radio'
import { ref } from 'vue'
const radio1 = ref('1')
const radio2 = ref('1')
const radio3 = ref('1')
const radio4 = ref('1')
</script>

<style lang="scss" scoped></style>
