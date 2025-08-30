<template>
  <div>
    <s-radio-group v-model="radio1">
      <s-radio-button value="上海"></s-radio-button>
      <s-radio-button value="北京"></s-radio-button>
      <s-radio-button value="广州"></s-radio-button>
      <s-radio-button value="深圳"></s-radio-button>
    </s-radio-group>
  </div>
  <div style="margin-top: 20px">
    <s-radio-group v-model="radio2" size="medium">
      <s-radio-button value="上海" ></s-radio-button>
      <s-radio-button value="北京"></s-radio-button>
      <s-radio-button value="广州"></s-radio-button>
      <s-radio-button value="深圳"></s-radio-button>
    </s-radio-group>
  </div>
  <div style="margin-top: 20px">
    <s-radio-group v-model="radio3" size="small">
      <s-radio-button value="上海"></s-radio-button>
      <s-radio-button value="北京" disabled ></s-radio-button>
      <s-radio-button value="广州"></s-radio-button>
      <s-radio-button value="深圳"></s-radio-button>
    </s-radio-group>
  </div>
  <div style="margin-top: 20px">
    <s-radio-group v-model="radio4" disabled size="mini">
      <s-radio-button value="上海"></s-radio-button>
      <s-radio-button value="北京"></s-radio-button>
      <s-radio-button value="广州"></s-radio-button>
      <s-radio-button value="深圳"></s-radio-button>
    </s-radio-group>
  </div>
</template>

<script setup>
import{ SRadioGroup,SRadioButton} from '@/components/Radio'
import { ref } from 'vue'
const radio1 = ref('上海')
const radio2 = ref('上海')
const radio3 = ref('上海')
const radio4= ref('上海')
</script>

<style lang="scss" scoped></style>
