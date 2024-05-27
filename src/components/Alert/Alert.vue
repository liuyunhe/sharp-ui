<template>
  <div role="alert" class="s-alert s-alert--info is-dark">
    <div class="s-alert__content">
      <span class="s-alert__title">消息提示的文案</span
      >

    </div>
    <div class="s-alert__close">
      <Icon icon="xmark" @click.stop="" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import Icon from '@/components/Icon/Icon.vue'
  defineOptions({
    name: 'S-Alert',
  })
</script>

<style scoped></style>
