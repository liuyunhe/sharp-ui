<template>
  <header>
    <div style="margin-bottom: 20px; width: 100%">
      <Alert ref="alertRef" content="成功提示的文案" type="success" show-icon> </Alert>
      <Button type="primary" @click="openAlert">打开Alert</Button>
      <Button @click="closeAlert">关闭Alert</Button>
    </div>
    <div style="margin-bottom: 20px">
      <Tooltip
        ref="tooltipRef"
        placement="right"
        :popper-options="popperOptions"
        :trigger="trigger"
        :open-delay="200"
        :close-delay="200"
      >
        <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
        <template #content>
          <div>Hello Tooltip</div>
        </template>
      </Tooltip>
    </div>
  </header>
  <Row :gutter="20" justify="space-evenly" align="middle" style="height: 100px">
    <Col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
      <div style="background: #d3dce6">123</div>
    </Col>
    <Col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
      <div style="background: #d3dce6">456</div>
    </Col>
    <Col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
      <div style="background: #d3dce6">789</div>
    </Col>
    <Col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
      <div style="background: #d3dce6">101112</div>
    </Col>
  </Row>
  <div style="margin-bottom: 20px">
    <s-checkbox-group v-model="checkList" :min="1" :max="2">
      <s-checkbox label="Option A" value="Value A" border />
      <s-checkbox label="Option B" value="Value B" border />
      <s-checkbox label="Option C" value="Value C" border />
      <s-checkbox label="disabled" value="Value disabled" disabled border />
      <s-checkbox
        label="selected and disabled"
        value="Value selected and disabled"
        disabled
        border
      />
    </s-checkbox-group>
  </div>
  <div style="margin-bottom: 20px">
    <InputNumber
      size="large"
      v-model="num"
      @change="handleChange"
      :precision="2"
      :min="1"
      :max="10"
      aria-label="描述文字"
      controls-position="right"
      :step="0.01"
    ></InputNumber>
  </div>
  <div style="margin-bottom: 20px">
    <s-radio-group v-model="radio" size="large">
      <s-radio-button value="1">备选项</s-radio-button>
      <s-radio-button value="2">备选项</s-radio-button>
      <s-radio-button value="3">备选项</s-radio-button>
      <s-radio-button value="4">备选项</s-radio-button>
    </s-radio-group>
  </div>
  <div style="margin-bottom: 20px">
    <Link underline icon="pen" type="danger" href="https://www.baidu.com" target="_blank"
      >测试</Link
    >
  </div>
  <div style="margin-bottom: 20px">
    <Button type="primary" @click="open">打开Tooltip</Button>
    <Button @click="close">关闭Tooltip</Button>
  </div>
  <div style="margin-bottom: 20px">
    <Dropdown
      ref="dropdownRef"
      :menu-options="menuOptions"
      trigger="click"
      :open-delay="100"
      :close-delay="100"
      manual
      @visible-change="(e) => inlineConsole('visible change', e)"
      @select="(e) => inlineConsole('select', e)"
    >
      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
    </Dropdown>
  </div>
  <div style="margin-bottom: 20px">
    <Button type="primary" @click="openDropdown">打开Dropdown</Button>
    <Button @click="closeDropdown">关闭Dropdown</Button>
  </div>
  <div style="margin-bottom: 20px">
    <Icon icon="arrow-up" :size="size" type="danger" color="#0e7a0d" spin />
  </div>
  <div style="margin-bottom: 20px">
    <Form :model="model" :rules="rules" ref="formRef">
      <FormItem label="the email" prop="email">
        <template #default="{ validate }">
          <Input v-model="model.email" />
          <Button @click.prevent="() => validate()" style="margin-top: 10px">validate email</Button>
        </template>
      </FormItem>
      <FormItem label="the password" prop="password">
        <Input type="password" v-model="model.password" />
      </FormItem>
      <FormItem prop="confirmPwd" label="confirm password">
        <Input v-model="model.confirmPwd" type="password" />
      </FormItem>
      <div :style="{ textAlign: 'center' }">
        <Button type="primary" @click.prevent="submit">Submit</Button>
        <Button @click.prevent="reset">Reset</Button>
      </div>
    </Form>
  </div>
  <main>
    <div style="margin-bottom: 20px">
      <Button ref="buttonRef" @click="openMessageBox">默认按钮</Button>
      <Button type="primary" @click="dialogFormVisible = true">主要按钮</Button>
      <Button type="success">成功按钮</Button>
      <Button type="info">信息按钮</Button>
      <Button type="warning">警告按钮</Button>
      <Button type="danger">危险按钮</Button>
    </div>
    <div style="margin-bottom: 20px">
      <Button plain>朴素按钮</Button>
      <Button type="primary" plain>主要按钮</Button>
      <Button type="success" plain>成功按钮</Button>
      <Button type="info" plain>信息按钮</Button>
      <Button type="warning" plain>警告按钮</Button>
      <Button type="danger" plain>危险按钮</Button>
    </div>
    <div style="margin-bottom: 20px">
      <Button round>圆角按钮</Button>
      <Button type="primary" round>主要按钮</Button>
      <Button type="success" round>成功按钮</Button>
      <Button type="info" round>信息按钮</Button>
      <Button type="warning" round>警告按钮</Button>
      <Button type="danger" round>危险按钮</Button>
    </div>
    <div style="margin-bottom: 20px">
      <Button size="small">small</Button>
      <Button type="primary" size="large">large</Button>
      <Button type="success" disabled>成功按钮</Button>
      <Button type="info" loading>信息按钮</Button>
    </div>
    <div style="margin-bottom: 20px; width: 300px">
      <Input v-model="inputValue" show-password clearable></Input>
    </div>
    <div style="margin-bottom: 20px">
      <Switch
        v-model="switchValue"
        active-value="1"
        inactive-value="0"
        active-text="打开"
        inactive-text="关闭"
        @change="(e) => inlineConsole('switch change', e)"
      ></Switch>
    </div>
    <div style="margin-bottom: 20px">
      <Select
        v-model="selectValue"
        :options="selectOptions"
        @change="(e) => inlineConsole('select change', e)"
        @visible-change="(e) => inlineConsole('select visible change', e)"
      ></Select>
    </div>
    <div style="margin-bottom: 20px">
      <Collapse v-model="openedValue" accordion>
        <CollapseItem name="a">
          <template #title>
            <h1>Title A</h1>
          </template>
          <h1>headline title</h1>
          <div>this is content a aaa</div>
        </CollapseItem>
        <CollapseItem name="b" title="Title B">
          <div>this is bbbbb test</div>
        </CollapseItem>
        <CollapseItem name="c" title="Disabled Title" disabled>
          <div>this is cccc test</div>
        </CollapseItem>
      </Collapse>
      {{ openedValue }}
    </div>
    <!-- <Overlay></Overlay> -->
  </main>
  <Dialog v-model="dialogFormVisible" title="Shipping address" width="500">
    <Form :model="model" :rules="rules" ref="formRef">
      <FormItem label="the email" prop="email">
        <template #default="{ validate }">
          <Input v-model="model.email" />
          <Button @click.prevent="() => validate()" style="margin-top: 10px">validate email</Button>
        </template>
      </FormItem>
      <FormItem label="the password" prop="password">
        <Input type="password" v-model="model.password" />
      </FormItem>
      <FormItem prop="confirmPwd" label="confirm password">
        <Input v-model="model.confirmPwd" type="password" />
      </FormItem>
      <div :style="{ textAlign: 'center' }">
        <Button type="primary" @click.prevent="submit">Submit</Button>
        <Button @click.prevent="reset">Reset</Button>
      </div>
    </Form>
    <template #footer>
      <div class="dialog-footer">
        <Button @click="dialogFormVisible = false">Cancel</Button>
        <Button type="primary" @click="dialogFormVisible = false"> Confirm </Button>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { h, nextTick, onMounted, reactive, ref } from 'vue'
import Button from '@/components/Button/Button.vue'
import Icon from './components/Icon/Icon.vue'
import SRadio, { SRadioGroup, SRadioButton } from './components/Radio'
import Collapse from '@/components/Collapse/Collapse.vue'
import CollapseItem from '@/components/Collapse/CollapseItem.vue'
import Dialog from '@/components/Dialog'
import type { ButtonInstance } from './components/Button/types'
import Tooltip from '@/components/Tooltip/Tooltip.vue'
import type { TooltipInstance } from './components/Tooltip/types'
import type { Options as PopperOptions } from '@popperjs/core'
import Dropdown from '@/components/Dropdown/Dropdown'
import SCheckbox, { SCheckboxGroup, SCheckboxButton } from './components/Checkbox'
import Input from '@/components/Input/Input.vue'
import InputNumber from '@/components/InputNumber/input-number.vue'
import Switch from '@/components/Switch/Switch.vue'
import Select from '@/components/Select/Select.vue'
import type { DropdownInstance, MenuOption } from '@/components/Dropdown/types'
import Form from '@/components/Form/Form.vue'
import FormItem from '@/components/Form/FormItem.vue'
import Alert from '@/components/Alert/Alert.vue'
import Row from '@/components/Row/Row.vue'
import Col from '@/components/Col/Col.vue'
import Link from '@/components/Link/Link.vue'
import { createMessage } from '@/components/Message/methods'
import type { FormRules } from './components/Form/types'
import type { AlertInstance } from './components/Alert/types'
import createMessageBox from '@/components/MessageBox'

const alertRef = ref<AlertInstance | null>(null)
const buttonRef = ref<ButtonInstance | null>(null)
const tooltipRef = ref<TooltipInstance | null>(null)
const dropdownRef = ref<DropdownInstance | null>(null)

const openMessageBox = () => {
  createMessageBox
    .confirm('proxy will permanently delete the file. Continue?', 'Warning', {
      confirmButtonText: '确定',
      cancelButtonText: 'Cancel',
      type: 'info',
      center: true
    })
    .then(() => {
      createMessage({
        type: 'success',
        message: 'Delete completed'
      })
    })
    .catch(() => {
      createMessage({
        type: 'info',
        message: 'Delete canceled'
      })
    })
}

const openedValue = ref(['a'])

const dialogFormVisible = ref(false)

const radio = ref(null)

const num = ref(1)

const handleChange = (value: number | undefined) => {
  console.log(value)
}

const checked1 = ref(true)
const checked2 = ref(false)

const checkList = ref(['Value selected and disabled', 'Value A'])

const size = ref<any>('3x')

const trigger = ref<any>('hover')

const inputValue = ref('hello word!')

const switchValue = ref('1')

const selectValue = ref('')

const selectOptions = ref([
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' }
])

const popperOptions: Partial<PopperOptions> = {
  placement: 'right-end',
  strategy: 'fixed'
}

const formRef = ref()
const model = reactive({
  email: '123',
  password: '',
  confirmPwd: ''
})
const rules: FormRules = {
  email: [{ type: 'email', required: true, trigger: 'blur' }],
  password: [{ type: 'string', required: true, trigger: 'blur', min: 3, max: 5 }],
  confirmPwd: [
    { type: 'string', required: true, trigger: 'blur' },
    {
      validator: (rule: any, value: string) => value === model.password,
      trigger: 'blur',
      message: '两个密码必须相同'
    }
  ]
}

const submit = async () => {
  try {
    await formRef.value.validate()
    console.log('passed!')
  } catch (e) {
    console.log('the error', e)
  }
}
const reset = () => {
  formRef.value.resetFields()
}

const openDropdown = () => {
  dropdownRef.value?.show()
}
const closeDropdown = () => {
  dropdownRef.value?.hide()
}

const open = () => {
  tooltipRef.value?.show()
}
const close = () => {
  tooltipRef.value?.hide()
}

const inlineConsole = (...args: any) => {
  console.log(...args)
}

const menuOptions: MenuOption[] = [
  { key: 1, label: h('b', 'this is bold') },
  { key: 2, label: 'item2', disabled: true },
  { key: 3, label: 'item3', divided: true },
  { key: 4, label: 'item4' }
]

const openAlert = () => {
  alertRef.value?.show()
}

const closeAlert = () => {
  alertRef.value?.hide()
}

onMounted(() => {
  const instance = createMessage({
    type: 'warning',
    message: 'hello word',
    showClose: true
  })
  nextTick(() => {
    console.log('🚀 ~ onMounted ~ instance:', instance)
  })
  createMessage({ type: 'success', message: 'hello word', showClose: true })
  createMessage({ type: 'info', message: 'hello word', showClose: true })
  createMessage({ type: 'danger', message: 'hello word', showClose: true })
  if (buttonRef.value) {
    console.log('🚀 ~ onMounted ~ buttonRef.value:', buttonRef.value)
    console.log('🚀 ~ onMounted ~ buttonRef.value.ref:', buttonRef.value.ref)
  }
  setTimeout(() => {
    openedValue.value = ['a', 'b']
    size.value = '2xl'
  }, 2000)
})
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
