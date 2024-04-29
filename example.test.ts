import { describe, expect, test, vi, Mocked } from 'vitest'
import { testFn, request } from './utils'
import axios from 'axios'
vi.mock('axios')
const mockedAxios = axios as Mocked<typeof axios>

test('test common matcher', () => {
  const name = 'sharp'
  expect(name).toBe('sharp')
  expect(2 + 2).toBe(4)
})

test('test to be true or false', () => {
  expect(1).toBeTruthy()
  expect(0).toBeFalsy()
})

test('test number', () => {
  expect(3).toBeGreaterThan(0)
  expect(2).toBeLessThan(5)
})

test('test object', () => {
  expect({ name: 'sharp' }).toEqual({ name: 'sharp' })
})

describe('test function', () => {
  test('create a mock function', () => {
    const callback = vi.fn()
    testFn(12, callback)
    expect(callback).toHaveBeenCalled()
    expect(callback).toHaveBeenCalledWith(12)
  })

  test('spy on method', () => {
    const obj = {
      getName: () => 1
    }
    const spy = vi.spyOn(obj, 'getName')
    obj.getName()
    expect(spy).toHaveBeenCalled()
    obj.getName()
    expect(spy).toHaveBeenCalledTimes(2)
  })

  test('mock request', async () => {
    // mockedAxios.get.mockImplementation(() => Promise.resolve({ data: { name: 'sharp' } }))
    mockedAxios.get.mockResolvedValue({ data: { name: 'sharp' } })
    const result = await request()
    expect(result).toEqual({ name: 'sharp' })
  })
})
