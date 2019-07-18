import { delay, typed } from './commonFunctions'


describe('delay', () => {
  jest.useFakeTimers() // TODO: reset timer spies

  it('should set an argument milliseconds timer', () => {
    delay(1000)

    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000)
  })
})

describe('typed', () => {
  it('should work as well as template literal', () => {
    expect(typed`hello`).toEqual(`hello`)
    expect(typed<[number]>`1 + 2 = ${ 1 + 2 }`).toEqual(`1 + 2 = ${ 1 + 2 }`)
  })
})
