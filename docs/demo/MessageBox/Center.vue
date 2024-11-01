<template>
   <Button plain @click="open">Click to open the Message Box</Button>
</template>

<script setup lang="ts">
import Button from '@/components/Button'
import createMessageBox from '@/components/MessageBox'
import { createMessage } from '@/components/Message'


const open = () => {
  createMessageBox.confirm(
    'proxy will permanently delete the file. Continue?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
      center: true,
    }
  )
    .then(() => {
      createMessage({
        type: 'success',
        message: 'Delete completed',
      })
    })
    .catch(() => {
      createMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
}

</script>

<style lang="scss" scoped>

</style>