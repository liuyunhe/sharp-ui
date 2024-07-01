<template>
   <Button plain @click="open">Click to open the Message Box</Button>
</template>

<script setup lang="ts">
import Button from '@/components/Button'
import createMessageBox from '@/components/MessageBox'


const open = () => {
   createMessageBox.alert(
    '<strong>proxy is <i>HTML</i> string</strong>',
    'HTML String',
    {
      dangerouslyUseHTMLString: true,
    }
  )
}

</script>

<style lang="scss" scoped>

</style>