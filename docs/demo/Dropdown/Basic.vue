<template>
  <Dropdwon trigger="click" :menuOptions="menuOptions">
    <span class="dropdown-link">
      下拉菜单<Icon class="icon-arrow-down" icon="caret-down" color="#409eff" />
    </span>
  </Dropdwon>
</template>

<script setup>
import Dropdwon from '@/components/Dropdown/Dropdown.vue'
import Icon from '@/components/Icon/Icon.vue'

const menuOptions = [
  {
    label: '黄金糕',
    value: '1'
  },
  {
    label: '狮子头',
    value: '2',
    disabled: true 
  },
  {
    label: '螺蛳粉',
    value: '3',
    divided: true
  },
  {
    label: '双皮奶',
    value: '4'
  },
  {
    label: '蚵仔煎'
  }
]
</script>

<style scoped>
.dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.icon-arrow-down {
  font-size: 12px;
  margin-left: 5px;
}
</style>
