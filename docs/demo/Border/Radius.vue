<template>
  <Row :gutter="12" class="demo-radius">
    <Col
      v-for="(radius, i) in radiusGroup"
      :key="i"
      :span="6"
      :xs="{ span: 12 }"
    >
      <div class="title">{{ radius.name }}</div>
      <div class="value">
        <code>border-radius: {{ getValue(radius.type) || '0px' }}</code>
      </div>
      <div
        class="radius"
        :style="{
          borderRadius: radius.type
            ? `var(--s-border-radius-${radius.type})`
            : '',
        }"
      />
    </Col>
  </Row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Row from '@/components/Row/Row.vue'
import Col from '@/components/Col/Col.vue'

const radiusGroup = ref([
  {
    name: 'No Radius',
    type: '',
  },
  {
    name: 'Small Radius',
    type: 'small',
  },
  {
    name: 'Large Radius',
    type: 'base',
  },
  {
    name: 'Round Radius',
    type: 'round',
  },
])

const getValue = (type: string) => {
  const getCssVarValue = (prefix, type) =>
    getComputedStyle(document.documentElement).getPropertyValue(
      `--s-${prefix}-${type}`
    )
  return getCssVarValue('border-radius', type)
}
</script>
<style scoped>
.demo-radius .title {
  color: var(--s-text-color-regular);
  font-size: 16px;
  margin: 10px 0;
}
.demo-radius .value {
  color: var(--s-text-color-primary);
  font-size: 14px;
  margin: 10px 0;
}
.demo-radius .radius {
  height: 40px;
  width: 70%;
  border: 1px solid var(--s-border-color);
  border-radius: 0;
  margin-top: 20px;
}
</style>
