<template>
  <div>
    <s-checkbox-group v-model="checkboxGroup1" size="large">
      <s-checkbox-button v-for="city in cities" :key="city" :value="city">
        {{ city }}
      </s-checkbox-button>
    </s-checkbox-group>
  </div>
  <div class="demo-button-style">
    <s-checkbox-group v-model="checkboxGroup2">
      <s-checkbox-button v-for="city in cities" :key="city" :value="city">
        {{ city }}
      </s-checkbox-button>
    </s-checkbox-group>
  </div>
  <div class="demo-button-style">
    <s-checkbox-group v-model="checkboxGroup3" size="small">
      <s-checkbox-button
        v-for="city in cities"
        :key="city"
        :value="city"
        :disabled="city === 'Beijing'"
      >
        {{ city }}
      </s-checkbox-button>
    </s-checkbox-group>
  </div>
  <div class="demo-button-style">
    <s-checkbox-group v-model="checkboxGroup4" size="small" disabled>
      <s-checkbox-button v-for="city in cities" :key="city" :value="city">
        {{ city }}
      </s-checkbox-button>
    </s-checkbox-group>
  </div>
</template>

<script setup>
import {SCheckboxGroup,SCheckboxButton} from '@/components/Checkbox'
import { ref } from 'vue'

const checkboxGroup1 = ref(['Shanghai'])
const checkboxGroup2 = ref(['Shanghai'])
const checkboxGroup3 = ref(['Shanghai'])
const checkboxGroup4 = ref(['Shanghai'])
const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen']
</script>

<style scoped>
.demo-button-style {
  margin-top: 24px;
}
</style>