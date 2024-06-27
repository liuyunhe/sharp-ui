<template>
  <Container>
    <Header height="60px">Header</Header>
    <Main>Main</Main>
  </Container>

  <Container>
    <Header>Header</Header>
    <Main>Main</Main>
    <Footer>Footer</Footer>
  </Container>

  <Container>
    <Aside width="200px">Aside</Aside>
    <Main>Main</Main>
  </Container>

  <Container>
    <Header>Header</Header>
    <Container>
      <Aside width="200px">Aside</Aside>
      <Main>Main</Main>
    </Container>
  </Container>

  <Container>
    <Header>Header</Header>
    <Container>
      <Aside width="200px">Aside</Aside>
      <Container>
        <Main>Main</Main>
        <Footer>Footer</Footer>
      </Container>
    </Container>
  </Container>

  <Container>
    <Aside width="200px">Aside</Aside>
    <Container>
      <Header>Header</Header>
      <Main>Main</Main>
    </Container>
  </Container>

  <Container>
    <Aside width="200px">Aside</Aside>
    <Container>
      <Header>Header</Header>
      <Main>Main</Main>
      <Footer>Footer</Footer>
    </Container>
  </Container>
</template>

<script setup>
import Container from '@/components/Container/Container.vue'
import Main from '@/components/Container/Main.vue'
import Header from '@/components/Container/Header.vue'
import Aside from '@/components/Container/Aside.vue'
import Footer from '@/components/Container/Footer.vue'
</script>

<style scoped>
.s-header,
.s-footer {
  background-color: #79bbff;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.s-aside {
  background-color: #a0cfff;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.s-main {
  background-color: #d9ecff;
  color: #333;
  text-align: center;
  line-height: 160px;
}
.vitepress-demo-preview-preview > .s-container {
  margin-bottom: 40px;
}
.s-container + .s-container {
  margin-bottom: 40px;
}

.s-container:nth-child(5) .s-aside,
.s-container:nth-child(6) .s-aside {
  line-height: 260px;
}

.s-container:nth-child(7) .s-aside {
  line-height: 320px;
}
</style>
