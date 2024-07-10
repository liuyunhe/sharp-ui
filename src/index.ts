import type { App } from 'vue-demi'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Alert from '@/components/Alert'
import Button from '@/components/Button'
import Collapse, { CollapseItem } from '@/components/Collapse'
import Dropdown from '@/components/Dropdown'
import Dialog from '@/components/Dialog'
import Form, { FormItem } from '@/components/Form'
import Icon from '@/components/Icon'
import Message, { createMessage, closeAll as closeMessageAll } from '@/components/Message'
import Input from '@/components/Input'
import InputNumber from '@/components/InputNumber'
import Radio from '@/components/Radio'
import Select from '@/components/Select'
import Switch from '@/components/Switch'
import Tooltip from '@/components/Tooltip'
import Row from '@/components/Row'
import Col from '@/components/Col'
import Link from '@/components/Link'
import Loading from '@/components/Loading'
import { Container, Aside, Footer, Header, Main } from '@/components/Container'
import createMessageBox from '@/components/MessageBox'

import './styles/index.css'

library.add(fas)

const components = [
  Alert,
  Button,
  Collapse,
  CollapseItem,
  Dropdown,
  Dialog,
  Form,
  FormItem,
  Icon,
  Message,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  Tooltip,
  Row,
  Col,
  Link,
  Container,
  Aside,
  Footer,
  Header,
  Main
]

const plugins = [createMessageBox, Loading]

const install = (app: App) => {
  components.forEach((component) => {
    app.component(component.name!, component)
  })
  plugins.forEach((plugin) => {
    app.use(plugin)
  })
}

export {
  install,
  Alert,
  Button,
  Collapse,
  CollapseItem,
  Dropdown,
  Dialog,
  Form,
  FormItem,
  Icon,
  Message,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  Tooltip,
  Row,
  Col,
  Link,
  Container,
  Aside,
  Footer,
  Header,
  Main,
  createMessage,
  closeMessageAll,
  createMessageBox
}

export * from './components/Alert'
export * from './components/Button'
export * from './components/Collapse'
export * from './components/Dropdown'
export * from './components/Form'
export * from './components/Icon'
export * from './components/Message'
export * from './components/Input'
export * from './components/InputNumber'
export * from './components/Radio'
export * from './components/Select'
export * from './components/Switch'
export * from './components/Tooltip'
export * from './components/Row'
export * from './components/Col'
export * from './components/Link'
export * from './components/Container'
export * from './components/MessageBox'
export * from './components/Loading'
export * from './components/Dialog'

export default {
  install
}
