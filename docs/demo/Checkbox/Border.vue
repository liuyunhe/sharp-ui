<template>
   <div>
    <s-checkbox v-model="checked1" label="Option1" size="large" border />
    <s-checkbox v-model="checked2" label="Option2" size="large" border />
  </div>
  <div class="mt-4">
    <s-checkbox v-model="checked3" label="Option1" border />
    <s-checkbox v-model="checked4" label="Option2" border />
  </div>
  <div class="mt-4">
    <s-checkbox-group v-model="checkboxGroup1" size="small">
      <s-checkbox label="Option1" value="Value1" border />
      <s-checkbox label="Option2" value="Value2" border />
    </s-checkbox-group>
  </div>
  <div class="mt-4">
    <s-checkbox-group v-model="checkboxGroup1" size="small">
      <s-checkbox label="Option1" value="Value1" border disabled />
      <s-checkbox label="Option2" value="Value2" border disabled />
    </s-checkbox-group>
  </div>
</template>

<script setup>
import SCheckbox, { SCheckboxGroup} from '@/components/Checkbox'
import { ref } from 'vue'

const checked1 = ref(true)
const checked2 = ref(false)
const checked3 = ref(false)
const checked4 = ref(true)
const checkboxGroup1 = ref(['Value1'])
</script>

<style lang="scss" scoped>

</style>