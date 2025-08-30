import { getCurrentInstance, ref } from 'vue'
import { useClipboard } from '@vueuse/core'
import { createMessage } from '@/components/Message/methods'
export const getCssVarName = (namespace: string, type: string) => {
  return type ? `--s-${namespace}-${type}` : `--s-${namespace}`
}

/**
 * get css var value by css var name
 * @param name
 * @returns
 */
export const getCssVarValue = (name: string) => {
  const val = ref(
    getComputedStyle(document.documentElement).getPropertyValue(name)
  )
  return val
}

export const getColorValue = (type: string) => {
  const color = getComputedStyle(document.documentElement).getPropertyValue(
    `--s-color-${type}`
  )
  return color
}

// copy color

export const useCopyColor = () => {
  const source = ref('')
  const { copy, isSupported } = useClipboard({ source })

  const vm = getCurrentInstance()!
  const copyColor = async (colorType: string) => {
    const colorValue = getColorValue(colorType)
    source.value = colorValue
    const { $message } = vm.appContext.config.globalProperties
    if (!isSupported) {
      createMessage({ message: $message, type:'error', showClose: true })
    }
    try {
      await copy()
      createMessage({
        message: `--s-color-${colorType}: ${source.value}`,
        type: 'success',
        showClose: true
      })
    } catch (e: any) {
      createMessage({ message: e.message, type: 'error', showClose: true })
    }
  }

  return {
    copyColor,
  }
}
