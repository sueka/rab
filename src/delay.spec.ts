import delay from './delay'

describe('delay', () => {
  jest.useFakeTimers() // TODO: Reset timer spies

  it('should set an argument milliseconds timer', () => {
    delay(1000)

    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000)
  })
})
