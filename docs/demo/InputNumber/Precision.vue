<template>
   <InputNumber v-model="num" :precision="2" :step="0.01" :max="10"/>
</template>

<script setup>
import { ref } from 'vue' 
import InputNumber from '@/components/InputNumber'
const num = ref(1)
</script>

<style lang="scss" scoped>

</style>