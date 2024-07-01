<template>
   <Button plain @click="open">Click to open the Message Box</Button>
</template>

<script setup lang="ts">
import Button from '@/components/Button'
import createMessageBox from '@/components/MessageBox'
import { createMessage } from '@/components/Message'


const open = () => {
  createMessageBox.prompt('Please input your e-mail', 'Tip', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    inputPattern:
      /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
    inputErrorMessage: 'Invalid Email',
  })
    .then(({ value }) => {
      createMessage({
        type: 'success',
        message: `Your email is:${value}`,
      })
    })
    .catch(() => {
      createMessage({
        type: 'info',
        message: 'Input canceled',
      })
    })
}

</script>

<style lang="scss" scoped>

</style>