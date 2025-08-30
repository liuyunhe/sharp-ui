<template>
   <InputNumber v-model="num1" size="large"/>
   <InputNumber v-model="num2" class="mx-4"/>
   <InputNumber v-model="num3" size="small"/>
</template>

<script setup>
import { ref } from 'vue' 
import InputNumber from '@/components/InputNumber'
const num1 = ref(1)
const num2 = ref(1)
const num3 = ref(1)
</script>

<style scoped>

</style>