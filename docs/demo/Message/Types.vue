<template>
  <Button :plain="true" @click="open('info')">Message</Button>
  <Button :plain="true" @click="open('success')">Success</Button>
  <Button :plain="true" @click="open('warning')">Warning</Button>
  <Button :plain="true" @click="open('danger')">Error</Button>
</template>

<script setup>
import { h } from 'vue'
import Button from '@/components/Button/Button.vue'
import { createMessage } from '@/components/Message/methods'

const open = (type) => {
  createMessage({ message: 'This is a message.', type })
}
</script>

<style lang="scss" scoped></style>
