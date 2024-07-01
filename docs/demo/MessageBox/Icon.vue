<template>
  <Button plain @click="open">Click to open the Message Box</Button>
</template>

<script setup lang="ts">
import Button from '@/components/Button'
import createMessageBox from '@/components/MessageBox'
import type { Action } from '@/components/MessageBox'
import { createMessage } from '@/components/Message'

const open = () => {
  createMessageBox.alert('This is a message', 'Title', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: 'OK',
    type: 'info',
    icon: 'pen',
    callback: (action: Action) => {
      createMessage({
        type: 'info',
        message: `action: ${action}`
      })
    }
  })
}
</script>

<style lang="scss" scoped></style>
