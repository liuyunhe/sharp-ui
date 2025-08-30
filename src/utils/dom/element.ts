import { isString } from '../types'
import { isClient } from '../browser'

/**
 * 根据传入的目标获取相应的元素。
 * 
 * 此函数旨在提供一种统一的方式来获取DOM元素，它可以处理字符串选择器、HTMLElement实例、Window对象，
 * 以及null和undefined。在客户端环境下，它会尝试使用字符串选择器来查询元素；如果不是字符串选择器，
 * 则直接返回目标对象。在非客户端环境下（如Node.js环境），所有操作都将返回null。
 * 
 * @param target - 目标元素，可以是字符串选择器、HTMLElement实例、Window对象，或者null和undefined。
 * @returns 返回查询到的HTMLElement实例、原始目标对象，或者在无法获取元素时返回null。
 */

type GetElement = <T extends string | HTMLElement | Window | null | undefined>(
  target: T
) => T extends string ? HTMLElement | null : T

/**
 * 获取元素的实现。
 * 
 * 此实现首先检查是否在客户端环境中，以及目标是否为空字符串，如果是，则直接返回null。
 * 对于字符串类型的目标，尝试使用querySelector来查询元素，并捕获可能的查询错误，错误情况下返回null。
 * 对于非字符串类型的目標，直接返回原对象。
 */

export const getElement = ((
  target: string | HTMLElement | Window | null | undefined
) => {
  if (!isClient || target === '') return null
  if (isString(target)) {
    try {
      return document.querySelector<HTMLElement>(target)
    } catch {
      return null
    }
  }
  return target
}) as GetElement
