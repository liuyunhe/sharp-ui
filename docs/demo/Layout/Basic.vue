<template>
  <Row>
    <Col :span="24"><div class="grid-content bg-purple-dark"></div></Col>
  </Row>
  <Row>
    <Col :span="12"><div class="grid-content bg-purple"></div></Col>
    <Col :span="12"><div class="grid-content bg-purple-light"></div></Col>
  </Row>
  <Row>
    <Col :span="8"><div class="grid-content bg-purple"></div></Col>
    <Col :span="8"><div class="grid-content bg-purple-light"></div></Col>
    <Col :span="8"><div class="grid-content bg-purple"></div></Col>
  </Row>
  <Row>
    <Col :span="6"><div class="grid-content bg-purple"></div></Col>
    <Col :span="6"><div class="grid-content bg-purple-light"></div></Col>
    <Col :span="6"><div class="grid-content bg-purple"></div></Col>
    <Col :span="6"><div class="grid-content bg-purple-light"></div></Col>
  </Row>
  <Row>
    <Col :span="4"><div class="grid-content bg-purple"></div></Col>
    <Col :span="4"><div class="grid-content bg-purple-light"></div></Col>
    <Col :span="4"><div class="grid-content bg-purple"></div></Col>
    <Col :span="4"><div class="grid-content bg-purple-light"></div></Col>
    <Col :span="4"><div class="grid-content bg-purple"></div></Col>
    <Col :span="4"><div class="grid-content bg-purple-light"></div></Col>
  </Row>
</template>

<script setup>
import Row from '@/components/Row/Row.vue'
import Col from '@/components/Col/Col.vue'
</script>

<style scoped>
.s-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.s-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
