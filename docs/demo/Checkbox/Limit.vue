<template>
  <s-checkbox-group v-model="checkedCities" :min="1" :max="2">
    <s-checkbox v-for="city in cities" :key="city" :label="city" :value="city">
      {{ city }}
    </s-checkbox>
  </s-checkbox-group>
</template>

<script setup>
import SCheckbox, { SCheckboxGroup} from '@/components/Checkbox'
import { ref } from 'vue'

const checkedCities = ref(['Shanghai', 'Beijing'])
const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen']
</script>

<style lang="scss" scoped>

</style>