import type { Options, Placement } from '@popperjs/core'
import { Fragment, computed, defineComponent, ref, type PropType } from 'vue'
import type { MenuOption } from './types'
import Tooltip from '@/components/Tooltip/Tooltip.vue'
import type { TooltipInstance } from '../Tooltip/types'

export default defineComponent({
  name: 'S-Dropdown',
  props: {
    placement: {
      type: String as PropType<Placement>,
      default: 'bottom'
    },
    trigger: {
      type: String as PropType<'hover' | 'click'>,
      default: 'hover'
    },
    transition: {
      type: String,
      default: 'fade'
    },
    openDelay: {
      type: Number,
      default: 0
    },
    closeDelay: {
      type: Number,
      default: 0
    },
    popperOptions: {
      type: Object as PropType<Options>
    },
    menuOptions: {
      type: Array as PropType<MenuOption[]>,
      required: true
    },
    hideAfterClick: {
      type: Boolean,
      default: true
    },
    manual: {
      type: Boolean
    }
  },
  emits: ['visible-change', 'select'],
  setup(props, { emit, slots, expose }) {
    const tooltipRef = ref<TooltipInstance | null>(null)

    const itemClick = (e: MenuOption) => {
      if (e.disabled) {
        return
      }
      emit('select', e)
      if (props.hideAfterClick) {
        tooltipRef.value?.hide()
      }
    }

    const visibleChange = (e: boolean) => {
      emit('visible-change', e)
    }

    const options = computed(() => {
      return props.menuOptions.map((option) => {
        return (
          <Fragment key={option.key}>
            {option.divided ? <li role="separator" class="divided-placeholder"></li> : ''}
            <li
              class={{
                's-dropdown__item': true,
                'is-disabled': option.disabled,
                'is-divided': option.divided
              }}
              id={`dropdown-item-${option.key}`}
              onClick={() => itemClick(option)}
            >
              {option.label}
            </li>
          </Fragment>
        )
      })
    })

    expose({
      show: () => tooltipRef.value?.show(),
      hide: () => tooltipRef.value?.hide()
    })

    return () => (
      <div class="s-dropdown">
        <Tooltip
          ref={tooltipRef}
          trigger={props.trigger}
          placement={props.placement}
          popperOptions={props.popperOptions}
          openDelay={props.openDelay}
          closeDelay={props.closeDelay}
          manual={props.manual}
          onVisibleChange={visibleChange}
        >
          {{
            default: () => slots.default?.(),
            content: () => <ul class="s-dropdown__menu">{options.value}</ul>
          }}
        </Tooltip>
      </div>
    )
  }
})
