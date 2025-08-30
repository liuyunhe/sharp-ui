// 导入类型定义
import type { RuleItem, ValidateError, ValidateFieldsError } from 'async-validator'
import type { ComponentSize } from '@/constants'

/**
 * 表单项属性接口
 * @interface FormItemProps
 * @property {string} label - 表单项标签
 * @property {string} [prop] - 表单项绑定的字段名（可选）
 */
export interface FormItemProps {
  label: string
  prop?: string
}

/**
 * 表单项规则接口，扩展自 async-validator 的 RuleItem
 * @interface FormItemRule
 * @extends {RuleItem}
 * @property {string} [trigger] - 触发验证的事件（可选）
 */
export interface FormItemRule extends RuleItem {
  trigger?: string
}

/**
 * 表单项上下文接口，包含表单项的验证和状态管理方法
 * @interface FormItemContext
 * @property {string} prop - 表单项绑定的字段名
 * @property {Function} validate - 触发表单项验证的方法
 * @property {Function} resetField - 重置表单项的方法
 * @property {Function} clearValidate - 清除表单项验证状态的方法
 */
export interface FormItemContext {
  prop: string
  labelId?: string
  inputIds?: string[]
  size?: ComponentSize
  addInputId?: (id: string) => void
  removeInputId?: (id: string) => void
  validate: (trigger?: string) => Promise<any>
  resetField(): void
  clearValidate(): void
}

/**
 * 表单项实例接口，提供表单项的验证和状态管理方法
 * @interface FormItemInstance
 * @property {ValidateStatusProp} validateStatus - 表单项的验证状态
 * @property {Function} validate - 触发表单项验证的方法
 * @property {Function} resetField - 重置表单项的方法
 * @property {Function} clearValidate - 清除表单项验证状态的方法
 */
export interface FormItemInstance {
  labelId?: string
  inputIds?: string[]
  size?: ComponentSize
  addInputId?: (id: string) => void
  validateStatus: ValidateStatusProp
  validate: (trigger?: string) => Promise<any>
  resetField(): void
  clearValidate(): void
}


/**
 * 表单验证规则映射，键为字段名，值为表单项规则数组
 * @type {Record<string, FormItemRule[]>}
 */
export type FormRules = Record<string, FormItemRule[]>

/**
 * 表单属性接口
 * @interface FormProps
 * @property {Record<string, any>} model - 表单数据模型
 * @property {FormRules} rules - 表单验证规则
 */
export interface FormProps {
  model: Record<string, any>
  rules: FormRules
  disabled?: boolean
  size?: ComponentSize
}

/**
 * 表单上下文接口，扩展自 FormProps，添加了表单字段管理方法
 * @interface FormContext
 * @extends {FormProps}
 * @property {Function} addField - 添加表单字段的方法
 * @property {Function} removeField - 移除表单字段的方法
 */
export interface FormContext extends FormProps {
  addField: (field: FormItemContext) => void
  removeField: (field: FormItemContext) => void
}

/**
 * 表单实例接口，提供表单的验证和状态管理方法
 * @interface FormInstance
 * @property {Function} validate - 验证整个表单的方法
 * @property {Function} resetFields - 重置整个表单字段的方法
 * @property {Function} clearValidate - 清除整个表单验证状态的方法
 */
export interface FormInstance {
  validate: () => Promise<any>
  resetFields: (props?: string[]) => void
  clearValidate: (props?: string[]) => void
}

/**
 * 表单项验证状态接口
 * @interface ValidateStatusProp
 * @property {'init' | 'success' | 'error'} state - 验证状态
 * @property {string} errorMsg - 验证错误信息
 * @property {boolean} loading - 验证是否加载中
 */
export interface ValidateStatusProp {
  state: 'init' | 'success' | 'error'
  errorMsg: string
  loading: boolean
}

/**
 * 表单验证失败信息接口
 * @interface FormValidateFailure
 * @property {ValidateError[] | null} errors - 验证错误数组，可能为 null
 * @property {ValidateFieldsError} fields - 验证失败的字段映射
 */
export interface FormValidateFailure {
  errors: ValidateError[] | null
  fields: ValidateFieldsError
}

