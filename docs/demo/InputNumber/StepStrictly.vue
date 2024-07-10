<template>
   <InputNumber v-model="num" @change="handleChange" :step="2" step-strictly/>
</template>

<script setup>
import { ref } from 'vue' 
import InputNumber from '@/components/InputNumber'
const num = ref(1)
const handleChange = (val) => {
  console.log(val)
}
</script>

<style lang="scss" scoped>

</style>