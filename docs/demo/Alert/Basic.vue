<template>
  <Alert content="成功提示的文案" type="success"> </Alert>
  <Alert content="消息提示的文案"> </Alert>
  <Alert content="警告提示的文案" type="warning"> </Alert>
  <Alert content="错误提示的文案" type="danger"> </Alert>
</template>

<script setup>
import Alert from '@/components/Alert/Alert.vue'
</script>

<style scoped>
.s-alert {
  margin: 20px 0;
}
</style>
