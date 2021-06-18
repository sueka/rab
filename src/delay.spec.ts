import delay from './delay'

describe('delay', () => {
  jest.useFakeTimers() // TODO: Reset timer spies

  const setTimeoutSpy = jest.spyOn(global, 'setTimeout') // TODO: Delete this line

  it('should set an argument milliseconds timer', () => {
    delay(1000)

    expect(setTimeoutSpy).toHaveBeenCalledTimes(1)
    expect(setTimeoutSpy).toHaveBeenLastCalledWith(expect.any(Function), 1000)
  })
})
