<template>
  <Button plain @click="open">Common VNode</Button>
  <Button plain @click="open1">Dynamic props</Button>
</template>

<script setup lang="ts">
import Button from '@/components/Button'
import Switch from '@/components/Switch'
import createMessageBox from '@/components/MessageBox'
import { ref, h } from 'vue'

const open = () => {
  createMessageBox({
    title: 'Message',
    message: h('p', null, [
      h('span', null, 'Message can be '),
      h('i', { style: 'color: teal' }, 'VNode')
    ])
  })
}

const open1 = () => {
  const checked = ref<boolean | string | number>(false)
  createMessageBox({
    title: 'Message',
    // Should pass a function if VNode contains dynamic props
    message: () =>
      h(Switch, {
        modelValue: checked.value,
        'onUpdate:modelValue': (val: boolean | string | number) => {
          checked.value = val
        }
      })
  })
}
</script>

<style lang="scss" scoped></style>
