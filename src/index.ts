import type { App } from 'vue-demi'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Alert from '@/components/Alert'
import Button from '@/components/Button'
import Collapse, { CollapseItem } from '@/components/Collapse'
import Dropdown from '@/components/Dropdown'
import Form, { FormItem } from '@/components/Form'
import Icon from '@/components/Icon'
import Message, { createMessage, closeAll as closeMessageAll } from '@/components/Message'
import Input from '@/components/Input'
import Select from '@/components/Select'
import Switch from '@/components/Switch'
import Tooltip from '@/components/Tooltip'
import Row from '@/components/Row'
import Col from '@/components/Col'

import './styles/index.css'

library.add(fas)

const components = [
  Alert,
  Button,
  Collapse,
  CollapseItem,
  Dropdown,
  Form,
  FormItem,
  Icon,
  Message,
  Input,
  Select,
  Switch,
  Tooltip,
  Row,
  Col
]

const install = (app: App) => {
  components.forEach((component) => {
    app.component(component.name!, component)
  })
}

export {
  install,
  Alert,
  Button,
  Collapse,
  CollapseItem,
  Dropdown,
  Form,
  FormItem,
  Icon,
  Message,
  Input,
  Select,
  Switch,
  Tooltip,
  Row,
  Col,
  createMessage,
  closeMessageAll
}

export * from './components/Alert'
export * from './components/Button'
export * from './components/Collapse'
export * from './components/Dropdown'
export * from './components/Form'
export * from './components/Icon'
export * from './components/Message'
export * from './components/Input'
export * from './components/Select'
export * from './components/Switch'
export * from './components/Tooltip'
export * from './components/Row'
export * from './components/Col'

export default {
  install
}
