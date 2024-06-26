<template>
  <Link>默认链接</Link>
  <Link type="primary">主要链接</Link>
  <Link type="success">成功链接</Link>
  <Link type="warning">警告链接</Link>
  <Link type="danger">危险链接</Link>
  <Link type="info">信息链接</Link>
</template>

<script setup>
import Link from '@/components/Link/Link.vue'
</script>
<style scoped>
@import '@/components/Link/style.css';
.s-link {
  margin: 0 5px;
}
</style>
