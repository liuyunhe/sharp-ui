<template>
   <InputNumber v-model="num" :min="1" :max="10" @change="handleChange" disabled/>
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