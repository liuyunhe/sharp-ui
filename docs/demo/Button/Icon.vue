<template>
  <div style="margin-bottom: 20px">
    <Button type="primary" icon="search">搜索</Button>
    <Button icon="edit">编辑</Button>
    <Button type="info" icon="message">信息按钮</Button>
    <Button type="danger" icon="trash">危险按钮</Button>
    <Button type="success" icon="share">分享</Button>
  </div>
  <div>
    <Button type="primary" icon="search" circle></Button>
    <Button icon="edit" circle></Button>
    <Button type="success" icon="share" circle></Button>
  </div>
</template>

<script setup>
import Button from '@/components/Button/Button.vue'
</script>
