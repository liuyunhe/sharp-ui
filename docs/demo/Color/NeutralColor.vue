<template>
  <Row :gutter="12">
    <Col :span="6" :xs="{ span: 12 }">
      <div class="demo-color-box-group">
        <div
          v-for="(text, i) in textColors"
          :key="i"
          class="demo-color-box demo-color-box-other"
          :style="{
            color: 'var(--s-bg-color)',
            background: text.var.value,
          }"
        >
          {{ text.name }}
          <div class="value" text="xs">
            {{ text.var.value.toUpperCase() }}
          </div>
        </div>
      </div>
    </Col>

    <Col :span="6" :xs="{ span: 12 }">
      <div class="demo-color-box-group">
        <div
          v-for="(border, i) in borderColors"
          :key="i"
          class="demo-color-box demo-color-box-other demo-color-box-lite"
          :style="{ background: border.var.value }"
        >
          {{ border.name }}
          <div class="value" text="xs">
            {{ border.var.value.toUpperCase() }}
          </div>
        </div>
      </div>
    </Col>

    <Col :span="6" :xs="{ span: 12 }">
      <div class="demo-color-box-group">
        <div
          v-for="(fill, i) in fillColors"
          :key="i"
          class="demo-color-box demo-color-box-other demo-color-box-lite"
          :style="{
            background: fill.var.value,
            border: `1px solid ${
              fill.name === 'Blank Fill'
                ? 'var(--s-border-color-light)'
                : 'transparent'
            }`,
          }"
        >
          {{ fill.name }}
          <div class="value" text="xs">
            {{ fill.var.value.toUpperCase() }}
          </div>
        </div>
      </div>
    </Col>

    <Col :span="6" :xs="{ span: 12 }">
      <div class="demo-color-box-group">
        <div
          class="demo-color-box demo-color-box-other"
          :style="{ background: black }"
        >
          Basic Black
          <div class="value" text="xs">{{ black }}</div>
        </div>
        <div
          class="demo-color-box demo-color-box-other"
          :style="{
            background: white,
            color: '#303133',
            border: '1px solid #eee',
          }"
        >
          Basic White
          <div class="value" text="xs">{{ white }}</div>
        </div>
        <div
          class="demo-color-box demo-color-box-other demo-color-box-lite bg-transparent"
        >
          Transparent
          <div class="value" text="xs">Transparent</div>
        </div>

        <div
          v-for="(bg, i) in backgroundColors"
          :key="i"
          class="demo-color-box demo-color-box-other demo-color-box-lite"
          :style="{
            background: bg.var.value,
            border:
              '1px solid ' + 'var(--s-border-color-light)'
          }"
        >
          {{ bg.name }}
          <div class="value" text="xs">
            {{ bg.var.value.toUpperCase() }}
          </div>
        </div>
      </div>
    </Col>
  </Row>
</template>

<script lang="ts" setup>
import { getCssVarName, getCssVarValue } from '../../utils'
import Row from '@/components/Row/Row.vue'
import Col from '@/components/Col/Col.vue'

const backgroundTypes = ['page', '', 'overlay']
const backgroundColors = backgroundTypes.map((type) => {
  return {
    name: type
      ? `${type[0].toUpperCase() + type.slice(1)} Background`
      : 'Base Background',
    var: getCssVarValue(getCssVarName('bg-color', type)),
  }
})

const borderTypes = ['darker', 'dark', '', 'light', 'lighter', 'extra-light']
const borderColors = borderTypes.map((type) => {
  return {
    name: type
      ? `${type[0].toUpperCase() + type.slice(1)} Border`
      : 'Base Border',
    var: getCssVarValue(getCssVarName('border-color', type)),
  }
})

const fillTypes = [
  'darker',
  'dark',
  '',
  'light',
  'lighter',
  'extra-light',
  'blank',
]
const fillColors = fillTypes.map((type) => {
  return {
    name: type ? `${type[0].toUpperCase() + type.slice(1)} Fill` : 'Base Fill',
    var: getCssVarValue(getCssVarName('fill-color', type)),
  }
})

const textTypes = ['primary', 'regular', 'secondary', 'placeholder', 'disabled']
const textColors = textTypes.map((type) => {
  return {
    name: `${type[0].toUpperCase() + type.slice(1)} Text`,
    var: getCssVarValue(getCssVarName('text-color', type)),
  }
})

const black = '#000000'
const white = '#FFFFFF'
</script>
