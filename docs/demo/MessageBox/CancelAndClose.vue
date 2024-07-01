<template>
  <Button plain @click="open">Click to open the Message Box</Button>
</template>

<script setup lang="ts">
import Button from '@/components/Button'
import createMessageBox from '@/components/MessageBox'
import type { Action } from '@/components/MessageBox'
import { createMessage } from '@/components/Message'

const open = () => {
  createMessageBox
    .confirm('You have unsaved changes, save and proceed?', 'Confirm', {
      distinguishCancelAndClose: true,
      confirmButtonText: 'Save',
      cancelButtonText: 'Discard Changes'
    })
    .then(() => {
      createMessage({
        type: 'info',
        message: 'Changes saved. Proceeding to a new route.'
      })
    })
    .catch((action: Action) => {
      createMessage({
        type: 'info',
        message:
          action === 'cancel'
            ? 'Changes discarded. Proceeding to a new route.'
            : 'Stay in the current route'
      })
    })
}
</script>

<style lang="scss" scoped></style>
