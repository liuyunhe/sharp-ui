<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <Transition name="fade-in-linear" @after-leave="$emit('vanish')">
    <SOverlay
      v-show="visible"
      :z-index="zIndex"
      :overlay-class="[ns.is('message-box'), modalClass]"
      :mask="modal"
    >
      <div
        role="dialog"
        :aria-label="title"
        aria-modal="true"
        :aria-describedby="!showInput ? contentId : undefined"
        :class="`${ns.namespace.value}-overlay-message-box`"
        @click="overlayEvent.onClick"
        @mousedown="overlayEvent.onMousedown"
        @mouseup="overlayEvent.onMouseup"
      >
        <SFocusTrap
          loop
          :trapped="visible"
          :FocusTrap-el="rootRef"
          :focus-start-el="focusStartRef"
          @release-requested="onCloseRequested"
        >
          <div
            ref="rootRef"
            :class="[
              ns.b(),
              customClass,
              ns.is('draggable', draggable),
              { [ns.m('center')]: center },
            ]"
            :style="customStyle"
            tabindex="-1"
            @click.stop=""
          >
            <div
              v-if="title !== null && title !== undefined"
              ref="headerRef"
              :class="[ns.e('header'), { 'show-close': showClose }]"
            >
              <div :class="ns.e('title')">
                <SIcon
                  v-if="center && type"
                  :class="[ns.e('status'), typeClass]"
                  :icon="iconComponent"
                >
                </SIcon>
                <span>{{ title }}</span>
              </div>
              <SButton
                v-if="showClose"
                type="button"
                :class="ns.e('headerbtn')"
                :aria-label="t('el.messagebox.close')"
                @click="
                  handleAction(distinguishCancelAndClose ? 'close' : 'cancel')
                "
                @keydown.prevent.enter="
                  handleAction(distinguishCancelAndClose ? 'close' : 'cancel')
                "
              >
                <SIcon :class="ns.e('close')" icon="close">
                </SIcon>
              </SButton>
            </div>
            <div :id="contentId" :class="ns.e('content')">
              <div :class="ns.e('container')">
                <SIcon
                  v-if="!center && hasMessage && type"
                  :class="[ns.e('status'), typeClass]"
                  :icon="iconComponent"
                >
                </SIcon>
                <div v-if="hasMessage" :class="ns.e('message')">
                  <slot>
                    <component
                      :is="showInput ? 'label' : 'p'"
                      v-if="!dangerouslyUseHTMLString"
                      :for="showInput ? inputId : undefined"
                    >
                      {{ !dangerouslyUseHTMLString ? message : '' }}
                    </component>
                    <component
                      :is="showInput ? 'label' : 'p'"
                      v-else
                      :for="showInput ? inputId : undefined"
                      v-html="message"
                    />
                  </slot>
                </div>
              </div>
              <div v-show="showInput" :class="ns.e('input')">
                <SInput
                  :id="inputId"
                  ref="inputRef"
                  v-model="inputValue"
                  :type="inputType"
                  :placeholder="inputPlaceholder"
                  :aria-invalid="validateError"
                  :class="{ invalid: validateError }"
                  @keydown.enter="handleInputEnter"
                />
                <div
                  :class="ns.e('errormsg')"
                  :style="{
                    visibility: !!editorErrorMessage ? 'visible' : 'hidden',
                  }"
                >
                  {{ editorErrorMessage }}
                </div>
              </div>
            </div>
            <div :class="ns.e('btns')">
              <SButton
                v-if="showCancelButton"
                :loading="cancelButtonLoading"
                :class="[cancelButtonClass]"
                :round="roundButton"
                :size="btnSize"
                @click="handleAction('cancel')"
                @keydown.prevent.enter="handleAction('cancel')"
              >
                {{ cancelButtonText || t('el.messagebox.cancel') }}
              </SButton>
              <SButton
                v-show="showConfirmButton"
                ref="confirmRef"
                type="primary"
                :loading="confirmButtonLoading"
                :class="[confirmButtonClasses]"
                :round="roundButton"
                :disabled="confirmButtonDisabled"
                :size="btnSize"
                @click="handleAction('confirm')"
                @keydown.prevent.enter="handleAction('confirm')"
              >
                {{ confirmButtonText || t('el.messagebox.confirm') }}
              </SButton>
            </div>
          </div>
        </SFocusTrap>
      </div>
    </SOverlay>
  </Transition>
</template>
<script lang="ts">
// @ts-nocheck
import {
  computed,
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  toRefs,
  watch,
} from 'vue'
import SButton from '@/components/Button'
import { TrapFocus } from '@/directives'
import {
  useDraggable,
  useId,
  useLockscreen,
  useSameTarget,
} from '@/hooks'
import SInput from '@/components/Input'
import SOverlay from '@/components/Overlay'
import {
  isValidComponentSize,
} from '@/utils'
import SIcon from '@/components/Icon'
import SFocusTrap from '@/components/FocusTrap'
import { useGlobalComponentSettings } from '@/components/ConfigProvider'

import type { ComponentPublicInstance, PropType } from 'vue'
import type { ComponentSize } from '@/constants'
import { DEFAULT_ICON } from '@/components/Message'
import type {
  Action,
  MessageBoxState,
  MessageBoxType,
} from './message-box.type'

export default defineComponent({
  name: 'SMessageBox',
  directives: {
    TrapFocus,
  },
  components: {
    SButton,
    SFocusTrap,
    SInput,
    SOverlay,
    SIcon,
  },
  inheritAttrs: false,
  props: {
    buttonSize: {
      type: String as PropType<ComponentSize>,
      validator: isValidComponentSize,
    },
    modal: {
      type: Boolean,
      default: true,
    },
    lockScroll: {
      type: Boolean,
      default: true,
    },
    showClose: {
      type: Boolean,
      default: true,
    },
    closeOnClickModal: {
      type: Boolean,
      default: true,
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true,
    },
    closeOnHashChange: {
      type: Boolean,
      default: true,
    },
    center: Boolean,
    draggable: Boolean,
    overflow: Boolean,
    roundButton: {
      default: false,
      type: Boolean,
    },
    container: {
      type: String, // default append to body
      default: 'body',
    },
    boxType: {
      type: String as PropType<MessageBoxType>,
      default: '',
    },
  },
  emits: ['vanish', 'action'],
  setup(props, { emit }) {
    // const popup = usePopup(props, doClose)
    const {
      locale,
      zIndex,
      ns,
      size: btnSize,
    } = useGlobalComponentSettings(
      'message-box',
      computed(() => props.buttonSize)
    )

    const { t } = locale
    const { nextZIndex } = zIndex

    const visible = ref(false)
    // s represents state
    const state = reactive<MessageBoxState>({
      // autofocus element when open message-box
      autofocus: true,
      beforeClose: null,
      callback: null,
      cancelButtonText: '',
      cancelButtonClass: '',
      confirmButtonText: '',
      confirmButtonClass: '',
      customClass: '',
      customStyle: {},
      dangerouslyUseHTMLString: false,
      distinguishCancelAndClose: false,
      icon: '',
      inputPattern: null,
      inputPlaceholder: '',
      inputType: 'text',
      inputValue: null,
      inputValidator: null,
      inputErrorMessage: '',
      message: null,
      modalFade: true,
      modalClass: '',
      showCancelButton: false,
      showConfirmButton: true,
      type: '',
      title: undefined,
      showInput: false,
      action: '' as Action,
      confirmButtonLoading: false,
      cancelButtonLoading: false,
      confirmButtonDisabled: false,
      editorErrorMessage: '',
      // refer to: https://github.com/ElemeFE/element/commit/2999279ae34ef10c373ca795c87b020ed6753eed
      // seemed ok for now without this state.
      // isOnComposition: false, // temporary remove
      validateError: false,
      zIndex: nextZIndex(),
    })

    const DEFAULT_TYPE = 'warning'

    const typeClass = computed(() => {
      const type = state.type || DEFAULT_TYPE
      return { [ns.bm('icon', type)]: type }
    })

    const contentId = useId()
    const inputId = useId()

    const iconComponent = computed(
      () => state.icon || DEFAULT_ICON[state.type] || DEFAULT_ICON.warning
    )
    const hasMessage = computed(() => !!state.message)
    const rootRef = ref<HTMLElement>()
    const headerRef = ref<HTMLElement>()
    const focusStartRef = ref<HTMLElement>()
    const inputRef = ref<ComponentPublicInstance>()
    const confirmRef = ref<ComponentPublicInstance>()

    const confirmButtonClasses = computed(() => state.confirmButtonClass)

    watch(
      () => state.inputValue,
      async (val) => {
        await nextTick()
        if (props.boxType === 'prompt' && val !== null) {
          validate()
        }
      },
      { immediate: true }
    )

    watch(
      () => visible.value,
      (val) => {
        if (val) {
          if (props.boxType !== 'prompt') {
            if (state.autofocus) {
              focusStartRef.value = confirmRef.value?.$el ?? rootRef.value
            } else {
              focusStartRef.value = rootRef.value
            }
          }
          state.zIndex = nextZIndex()
        }
        if (props.boxType !== 'prompt') return
        if (val) {
          nextTick().then(() => {
            if (inputRef.value && inputRef.value.$el) {
              if (state.autofocus) {
                focusStartRef.value = getInputElement() ?? rootRef.value
              } else {
                focusStartRef.value = rootRef.value
              }
            }
          })
        } else {
          state.editorErrorMessage = ''
          state.validateError = false
        }
      }
    )

    const draggable = computed(() => props.draggable)
    const overflow = computed(() => props.overflow)
    useDraggable(rootRef, headerRef, draggable, overflow)

    onMounted(async () => {
      await nextTick()
      if (props.closeOnHashChange) {
        window.addEventListener('hashchange', doClose)
      }
    })

    onBeforeUnmount(() => {
      if (props.closeOnHashChange) {
        window.removeEventListener('hashchange', doClose)
      }
    })

    function doClose() {
      if (!visible.value) return
      visible.value = false
      nextTick(() => {
        if (state.action) emit('action', state.action)
      })
    }

    const handleWrapperClick = () => {
      if (props.closeOnClickModal) {
        handleAction(state.distinguishCancelAndClose ? 'close' : 'cancel')
      }
    }

    const overlayEvent = useSameTarget(handleWrapperClick)

    const handleInputEnter = (e: KeyboardEvent) => {
      if (state.inputType !== 'textarea') {
        e.preventDefault()
        return handleAction('confirm')
      }
    }

    const handleAction = (action: Action) => {
      if (props.boxType === 'prompt' && action === 'confirm' && !validate()) {
        return
      }

      state.action = action

      if (state.beforeClose) {
        state.beforeClose?.(action, state, doClose)
      } else {
        doClose()
      }
    }

    const validate = () => {
      if (props.boxType === 'prompt') {
        const inputPattern = state.inputPattern
        if (inputPattern && !inputPattern.test(state.inputValue || '')) {
          state.editorErrorMessage =
            state.inputErrorMessage || t('el.messagebox.error')
          state.validateError = true
          return false
        }
        const inputValidator = state.inputValidator
        if (typeof inputValidator === 'function') {
          const validateResult = inputValidator(state.inputValue)
          if (validateResult === false) {
            state.editorErrorMessage =
              state.inputErrorMessage || t('el.messagebox.error')
            state.validateError = true
            return false
          }
          if (typeof validateResult === 'string') {
            state.editorErrorMessage = validateResult
            state.validateError = true
            return false
          }
        }
      }
      state.editorErrorMessage = ''
      state.validateError = false
      return true
    }

    const getInputElement = () => {
      const inputRefs = inputRef.value.$refs
      return (inputRefs.input || inputRefs.textarea) as HTMLElement
    }

    const handleClose = () => {
      handleAction('close')
    }

    // when close on press escape is disabled, pressing esc should not callout
    // any other message box and close any other dialog-ish elements
    // e.g. Dialog has a close on press esc feature, and when it closes, it calls
    // props.beforeClose method to make a intermediate state by callout a message box
    // for some verification or alerting. then if we allow global event liek this
    // to dispatch, it could callout another message box.
    const onCloseRequested = () => {
      if (props.closeOnPressEscape) {
        handleClose()
      }
    }

    // locks the screen to prevent scroll
    if (props.lockScroll) {
      useLockscreen(visible)
    }

    return {
      ...toRefs(state),
      ns,
      overlayEvent,
      visible,
      hasMessage,
      typeClass,
      contentId,
      inputId,
      btnSize,
      iconComponent,
      confirmButtonClasses,
      rootRef,
      focusStartRef,
      headerRef,
      inputRef,
      confirmRef,
      doClose, // for outside usage
      handleClose, // for out side usage
      onCloseRequested,
      handleWrapperClick,
      handleInputEnter,
      handleAction,
      t,
    }
  },
})
</script>
