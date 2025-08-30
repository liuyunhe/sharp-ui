---
title: Color
description: Color 的文档
---

# Color 色彩

Element 为了避免视觉传达差异，使用一套特定的调色板来规定颜色，为你所搭建的产品提供一致的外观视觉感受。

<style>
/* demo-color-box 样式定义 */
.demo-color-box {
  position: relative;
  border-radius: 4px;
  padding: 20px;
  margin: 8px 0;
  height: 112px;
  box-sizing: border-box;
  color: var(--s-color-white);
  font-size: 14px;
}

/* demo-color-box 内部 .bg-color-sub 样式 */
.demo-color-box .bg-color-sub {
  width: 100%;
  height: 40px;
  left: 0;
  bottom: 0;
  position: absolute;
}

/* demo-color-box 内部 .bg-color-sub 的 .bg-blue-sub-item 样式 */
.demo-color-box .bg-color-sub .bg-blue-sub-item,
.demo-color-box .bg-color-sub .bg-secondary-sub-item {
  height: 100%;
  display: inline-block;
}

/* .bg-blue-sub-item 和 .bg-secondary-sub-item 的第一个子元素的样式 */
.demo-color-box .bg-color-sub .bg-blue-sub-item:first-child,
.demo-color-box .bg-color-sub .bg-secondary-sub-item:first-child {
  border-radius: 0 0 0 var(--s-border-radius-base);
}

/* demo-color-box 内部 .value 样式 */
.demo-color-box .value {
  margin-top: 2px;
}

/* demo-color-box-lite 样式定义 */
.demo-color-box-lite {
  color: var(--s-text-color-primary);
}
</style>

<script setup>
import MainColor from '../demo/Color/MainColor.vue'
import SecondaryColors from '../demo/Color/SecondaryColors.vue'
import NeutralColor from '../demo/Color/NeutralColor.vue'
  
</script>

## 主色

Element 主要品牌颜色是鲜艳、友好的蓝色。

<ClientOnly>
  <MainColor />
</ClientOnly>



## 辅助色

除了主色外的场景色，需要在不同的场景中使用（例如危险色表示危险的操作）。

<ClientOnly>
  <SecondaryColors/>
</ClientOnly>




## 中性色

中性色用于文本、背景和边框颜色。通过运用不同的中性色，来表现层次结构。

<ClientOnly>
  <NeutralColor/>
</ClientOnly>
