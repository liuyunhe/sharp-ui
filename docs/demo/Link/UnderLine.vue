<template>
  <Link :underline="false">无下划线</Link>
  <Link >有下划线</Link>

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
