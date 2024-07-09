<template>
   <InputNumber v-model="num1" size="large" controls-position="right"/>
   <InputNumber v-model="num2" class="mx-4" controls-position="right"/>
   <InputNumber v-model="num3" size="small" controls-position="right"/>
</template>

<script setup>
import { ref } from 'vue' 
import InputNumber from '@/components/InputNumber'
const num1 = ref(1)
const num2 = ref(1)
const num3 = ref(1)
const handleChange = (val) => {
  console.log(val)
}
</script>

<style scoped>

</style>