<template>
  <s-checkbox
    v-model="checkAll"
    :indeterminate="isIndeterminate"
    @change="handleCheckAllChange"
  >
    Check all
  </s-checkbox>
  <s-checkbox-group
    v-model="checkedCities"
    @change="handleCheckedCitiesChange"
  >
    <s-checkbox v-for="city in cities" :key="city" :label="city" :value="city">
      {{ city }}
    </s-checkbox>
  </s-checkbox-group>
</template>

<script setup>
import SCheckbox, { SCheckboxGroup} from '@/components/Checkbox'
import { ref } from 'vue'

const checkAll = ref(false)
const isIndeterminate = ref(true)
const checkedCities = ref(['Shanghai', 'Beijing'])
const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen']

const handleCheckAllChange = (val) => {
  checkedCities.value = val ? cities : []
  isIndeterminate.value = false
}
const handleCheckedCitiesChange = (value) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === cities.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length
}
</script>

<style lang="scss" scoped>

</style>