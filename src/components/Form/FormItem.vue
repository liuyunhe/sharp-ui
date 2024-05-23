<template>
  <div
    class="s-form-item"
    :class="{
      'is-error': validateStatus.state === 'error',
      'is-success': validateStatus.state === 'success',
      'is-loading': validateStatus.loading,
      'is-required': isRequired
    }"
  >
    <label class="s-form-item__label">
      <slot name="label" :label="label">
        {{ label }}
      </slot>
    </label>
    <div class="s-form-item__content">
      <slot :validate="validate" />
      <div class="s-form-item__error-msg" v-if="validateStatus.state === 'error'">
        {{ validateStatus.errorMsg }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { inject, computed, reactive, provide, onMounted, onUnmounted } from 'vue'
import Schema from 'async-validator'
import { isNil } from 'lodash-es'
import { formContextKey, formItemContextKey } from './types'
import type {
  FormItemProps,
  FormValidateFailure,
  FormItemContext,
  ValidateStatusProp,
  FormItemInstance
} from './types'

// 定义组件选项
defineOptions({
  name: 'S-Form-Item'
})

// 获取组件props
const props = defineProps<FormItemProps>()

// 注入表单上下文，响应式管理验证状态
const formContext = inject(formContextKey)
const validateStatus: ValidateStatusProp = reactive({
  state: 'init',
  errorMsg: '',
  loading: false
})

// 初始化字段值
let initialValue: any = null

// 计算内部值，基于表单模型和当前道具
const innerValue = computed(() => {
  const model = formContext?.model
  if (model && props.prop && !isNil(model[props.prop])) {
    return model[props.prop]
  } else {
    return null
  }
})

// 计算道具规则
const itemRules = computed(() => {
  const rules = formContext?.rules
  if (rules && props.prop && rules[props.prop]) {
    return rules[props.prop]
  } else {
    return []
  }
})

// 获取触发的规则
const getTriggeredRules = (trigger?: string) => {
  const rules = itemRules.value
  if (rules) {
    return rules.filter((rule) => {
      if (!rule.trigger || !trigger) return true
      return rule.trigger && rule.trigger === trigger
    })
  } else {
    return []
  }
}

// 计算是否必需字段
const isRequired = computed(() => {
  return itemRules.value.some((rule) => rule.required)
})

/**
 * 执行字段验证
 * @param trigger 触发验证的事件类型
 * @returns 返回一个Promise，成功时解决为true，失败时拒绝并返回验证错误
 */
const validate = async (trigger?: string) => {
  const modelName = props.prop
  const triggeredRules = getTriggeredRules(trigger)
  if (triggeredRules.length === 0) {
    return true
  }
  if (modelName) {
    const validator = new Schema({
      [modelName]: triggeredRules
    })
    validateStatus.loading = true
    return validator
      .validate({ [modelName]: innerValue.value })
      .then(() => {
        validateStatus.state = 'success'
      })
      .catch((e: FormValidateFailure) => {
        const { errors } = e
        validateStatus.state = 'error'
        validateStatus.errorMsg = errors && errors.length > 0 ? errors[0].message || '' : ''
        console.log(e.errors)
        return Promise.reject(e)
      })
      .finally(() => {
        validateStatus.loading = false
      })
  }
}

// 清除验证状态
const clearValidate = () => {
  validateStatus.state = 'init'
  validateStatus.errorMsg = ''
  validateStatus.loading = false
}

// 重置字段值到初始状态
const resetField = () => {
  clearValidate()
  const model = formContext?.model
  if (model && props.prop && !isNil(model[props.prop])) {
    model[props.prop] = initialValue
  }
}

// 提供表单域上下文
const context: FormItemContext = {
  validate,
  prop: props.prop || '',
  clearValidate,
  resetField
}
provide(formItemContextKey, context)

// 组件挂载时，添加字段到表单上下文
onMounted(() => {
  if (props.prop) {
    formContext?.addField(context)
    initialValue = innerValue.value
  }
})

// 组件卸载时，从表单上下文移除字段
onUnmounted(() => {
  formContext?.removeField(context)
})

// 暴露公共接口
defineExpose<FormItemInstance>({
  validateStatus,
  validate,
  resetField,
  clearValidate
})
</script>