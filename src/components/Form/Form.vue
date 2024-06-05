<template>
  <form class="s-form">
    <slot />
  </form>
</template>
<script setup lang="ts">
import { provide } from 'vue'
import type { ValidateFieldsError } from 'async-validator'
import type {
  FormProps,
  FormItemContext,
  FormContext,
  FormValidateFailure,
  FormInstance
} from './types'
import { formContextKey } from './types'

// 定义组件属性
const props = defineProps<FormProps>()
defineOptions({
  name: 'S-Form'
})

// 维护一个表单域数组
const fields: FormItemContext[] = []

// 添加表单域到fields数组
const addField: FormContext['addField'] = (field) => {
  fields.push(field)
}

// 从fields数组中移除表单域
const removeField: FormContext['removeField'] = (field) => {
  if (field.prop) {
    fields.splice(fields.indexOf(field), 1)
  }
}

// 重置指定的表单域或所有表单域
const resetFields = (keys: string[] = []) => {
  const filterArr = keys.length > 0 ? fields.filter((field) => keys.includes(field.prop)) : fields
  filterArr.forEach((field) => field.resetField())
}

// 清除指定的表单域或所有表单域的验证信息
const clearValidate = (keys: string[] = []) => {
  const filterArr = keys.length > 0 ? fields.filter((field) => keys.includes(field.prop)) : fields
  filterArr.forEach((field) => field.clearValidate())
}

// 异步验证所有表单域
const validate = async () => {
  let validationErrors: ValidateFieldsError = {}
  console.log('fields', fields)
  for (const field of fields) {
    try {
      await field.validate('')
    } catch (e) {
      const error = e as FormValidateFailure
      validationErrors = {
        ...validationErrors,
        ...error.fields
      }
    }
  }
  if (Object.keys(validationErrors).length === 0) return true
  return Promise.reject(validationErrors)
}

// 提供表单上下文给子组件
provide(formContextKey, {
  ...props,
  addField,
  removeField
})

// 暴露表单实例方法给外部使用
defineExpose<FormInstance>({
  validate,
  resetFields,
  clearValidate
})
</script>