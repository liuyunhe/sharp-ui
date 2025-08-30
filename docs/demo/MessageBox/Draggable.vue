<template>
  <Button plain @click="open">Open a draggable Message Box</Button>
  <Button plain @click="open2">Open a overflow draggable Message Box</Button>
</template>

<script setup lang="ts">
import Button from '@/components/Button'
import createMessageBox from '@/components/MessageBox'
import { createMessage } from '@/components/Message'

const open = () => {
  createMessageBox
    .confirm('proxy will permanently delete the file. Continue?', 'Warning', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
      draggable: true
    })
    .then(() => {
      createMessage({
        type: 'success',
        message: 'Delete completed'
      })
    })
    .catch(() => {
      createMessage({
        type: 'info',
        message: 'Delete canceled'
      })
    })
}

const open2 = () => {
  createMessageBox
    .confirm('proxy will permanently delete the file. Continue?', 'Warning', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
      draggable: true,
      overflow: true
    })
    .then(() => {
      createMessage({
        type: 'success',
        message: 'Delete completed'
      })
    })
    .catch(() => {
      createMessage({
        type: 'info',
        message: 'Delete canceled'
      })
    })
}
</script>

<style lang="scss" scoped></style>
