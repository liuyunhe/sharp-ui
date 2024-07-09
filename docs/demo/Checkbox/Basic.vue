<template>
  <div>
    <s-checkbox v-model="checked1" label="Option 1" size="large" />
    <s-checkbox v-model="checked2" label="Option 2" size="large" />
  </div>
  <div>
    <s-checkbox v-model="checked3" label="Option 1" />
    <s-checkbox v-model="checked4" label="Option 2" />
  </div>
  <div>
    <s-checkbox v-model="checked5" label="Option 1" size="small" />
    <s-checkbox v-model="checked6" label="Option 2" size="small" />
  </div>
  <div>
    <s-checkbox v-model="checked7" label="Option 1" size="small" disabled />
    <s-checkbox v-model="checked8" label="Option 2" size="small" disabled />
  </div>
</template>

<script setup>
import SCheckbox from '@/components/Checkbox'
import { ref } from 'vue'

const checked1 = ref(true)
const checked2 = ref(false)
const checked3 = ref(false)
const checked4 = ref(false)
const checked5 = ref(false)
const checked6 = ref(false)
const checked7 = ref(false)
const checked8 = ref(false)
</script>

<style lang="scss" scoped>

</style>