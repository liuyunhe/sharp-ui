<template>
  <s-checkbox-group v-model="checkList">
    <s-checkbox label="Option A" value="Value A" />
    <s-checkbox label="Option B" value="Value B" />
    <s-checkbox label="Option C" value="Value C" />
    <s-checkbox label="disabled" value="Value disabled" disabled />
    <s-checkbox
      label="selected and disabled"
      value="Value selected and disabled"
      disabled
    />
  </s-checkbox-group>
</template>

<script setup>
import SCheckbox, { SCheckboxGroup} from '@/components/Checkbox'
import { ref } from 'vue'

const checkList = ref(['Value selected and disabled', 'Value A'])
</script>

<style lang="scss" scoped>

</style>