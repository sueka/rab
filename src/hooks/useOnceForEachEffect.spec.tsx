import { renderHook } from '@testing-library/react-hooks'
import { useEffect } from 'react'

import useOnceForEachEffect from './useOnceForEachEffect'

jest.mock('react', () => ({
  ...(jest.requireActual('react') as any),
  useEffect: jest.fn(jest.requireActual('react').useEffect),
}))

describe('useOnceForEachEffect', () => {
  it('should call useEffect', () => {
    const effect = (_x: never) => {
      // Silence is golden.
    }

    renderHook(() => useOnceForEachEffect([], undefined, effect))

    expect(useEffect).toBeCalled()
  })

  it('should call effect with each element of xs', () => {
    const effect = jest.fn()

    renderHook(() => useOnceForEachEffect(['a', 'b', 'c'], undefined, effect))

    expect(effect).toBeCalledTimes(3)
    expect(effect).toBeCalledWith('a')
    expect(effect).toBeCalledWith('b')
    expect(effect).toBeCalledWith('c')
  })

  it('should call effect with each element identified of xs', () => {
    const effect = jest.fn()

    const isOdd = (x: number) => Number.isInteger(x) && x % 2 === 1

    renderHook(() => useOnceForEachEffect([1, 2, 3, 4], isOdd, effect))

    expect(effect).toBeCalledTimes(2)
    expect(effect).toBeCalledWith(1)
    expect(effect).toBeCalledWith(2)
  })

  it('should call effect with each element of xs when deps update', () => {
    const effect = jest.fn()

    const { rerender } = renderHook(({ foo }) => useOnceForEachEffect(['a', 'b', 'c'], undefined, effect, [foo]), {
      initialProps: {
        foo: 0,
      },
    })

    expect(effect).toBeCalledTimes(3)
    expect(effect).toBeCalledWith('a')
    expect(effect).toBeCalledWith('b')
    expect(effect).toBeCalledWith('c')

    effect.mockClear()

    rerender({ foo: 1 })

    expect(effect).toBeCalledTimes(3)
    expect(effect).toBeCalledWith('a')
    expect(effect).toBeCalledWith('b')
    expect(effect).toBeCalledWith('c')
  })

  it('should call cleanup with each element of xs when unmounted', () => { // NOTE: effect は deps が変更されたときにも cleanup される
    const cleanup = jest.fn()

    const effect = () => cleanup

    const { rerender, unmount } = renderHook(({ foo }) => useOnceForEachEffect(['a', 'b', 'c'], undefined, effect, [foo]), {
      initialProps: {
        foo: 0,
      },
    })

    expect(cleanup).toBeCalledTimes(0)

    rerender({ foo: 1 })

    expect(cleanup).toBeCalledTimes(3)
    expect(cleanup).toBeCalledWith('a')
    expect(cleanup).toBeCalledWith('b')
    expect(cleanup).toBeCalledWith('c')

    cleanup.mockClear()

    unmount()

    expect(cleanup).toBeCalledTimes(3)
    expect(cleanup).toBeCalledWith('a')
    expect(cleanup).toBeCalledWith('b')
    expect(cleanup).toBeCalledWith('c')
  })
})
