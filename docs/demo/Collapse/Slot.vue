<template>
  <Collapse v-model="openedValue">
    <CollapseItem name="a">
      <template #title>
        <h1 style="font-size: 16px;">一致性 Consistency<Icon icon="pen" color="#999"></Icon> </h1>
      </template>
      <h1>与现实生活一致:</h1>
      <div>与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念</div>
    </CollapseItem>
    <CollapseItem name="b" title="反馈 Feedback">
      <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
      <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
    </CollapseItem>
    <CollapseItem name="c" title="可控 Controllability" disabled>
      <div>简化流程：设计简洁直观的操作流程；</div>
    </CollapseItem>
  </Collapse>
</template>

<script setup>
import { ref } from 'vue'
import Collapse from '@/components/Collapse/Collapse.vue'
import CollapseItem from '@/components/Collapse/CollapseItem.vue'
import Icon from '@/components/Icon/Icon.vue'

const openedValue = ref(['a'])
</script>

