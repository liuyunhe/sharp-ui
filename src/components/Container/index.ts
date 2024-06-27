import { withInstall, withNoopInstall } from '@/utils/index'

// 容器组件

import Container from './Container.vue'
import Aside from './Aside.vue'
import Footer from './Footer.vue'
import Header from './Header.vue'
import Main from './Main.vue'

export const SContainer = withInstall(Container, {
  Aside,
  Footer,
  Header,
  Main
})

export default SContainer
export const SAside = withNoopInstall(Aside)
export const SFooter = withNoopInstall(Footer)
export const SHeader = withNoopInstall(Header)
export const SMain = withNoopInstall(Main)

export type ContainerInstance = InstanceType<typeof Container>
export type AsideInstance = InstanceType<typeof Aside>
export type FooterInstance = InstanceType<typeof Footer>
export type HeaderInstance = InstanceType<typeof Header>
export type MainInstance = InstanceType<typeof Main>

export { Container, Aside, Footer, Header, Main }