<template>
  <Button :plain="true" @click="open">Show message</Button>
  <Button :plain="true" @click="openVn">VNode</Button>
</template>

<script setup>
import { h } from 'vue'
import Button from '@/components/Button/Button.vue'
import { createMessage } from '@/components/Message/methods'

const open = () => {
  createMessage({ message: 'This is a message.' })
}
const openVn = () => {
  createMessage({
    message: h('p', { style: 'line-height: 1; font-size: 14px' }, [
      h('span', null, 'Message can be '),
      h('i', { style: 'color: teal' }, 'VNode')
    ])
  })
}
</script>

<style lang="scss" scoped></style>
