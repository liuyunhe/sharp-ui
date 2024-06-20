<template>
  <div class="container">
    <Icon icon="edit" type="danger" color="#3451b2" size="2x" />
    <Icon icon="share" type="danger" color="#3451b2" size="2x" />
    <Icon icon="user" type="danger" color="#3451b2" size="2x" />
    <Button type="primary" icon="search">搜索</Button>
  </div>
</template>

<script setup>
import Icon from '@/components/Icon/Icon.vue'
import Button from '@/components/Button/Button.vue'
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
}
.container > i,button {
  margin: 0 20px;
}
</style>
