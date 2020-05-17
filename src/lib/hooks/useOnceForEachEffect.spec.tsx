import { renderHook } from '@testing-library/react-hooks'
import { useEffect } from 'react'

import useOnceForEachEffect from './useOnceForEachEffect'

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(jest.requireActual('react').useEffect),
}))

describe('useOnceForEachEffect', () => {
  it('should call useEffect', () => {
    const effect = jest.fn()

    renderHook(() => useOnceForEachEffect([], undefined, effect))

    expect(useEffect).toBeCalled()
  })

  it('should call effect with each element of xs the size of xs times', () => {
    const effect = jest.fn()

    renderHook(() => useOnceForEachEffect(['a', 'b', 'c'], undefined, effect))

    expect(effect).toBeCalledTimes(3)
    expect(effect).toBeCalledWith('a')
    expect(effect).toBeCalledWith('b')
    expect(effect).toBeCalledWith('c')
  })
})
