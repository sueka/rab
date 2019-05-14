import { AbstractError } from './errors'

class FooError extends AbstractError {}

test('extends AbstractError', () => {
  const error = new FooError()

  expect(error.name).toBe('FooError')
  expect(error.stack).not.toBeUndefined()
  expect(error).toBeInstanceOf(FooError)
  expect(error).toBeInstanceOf(AbstractError)
  expect(error).toBeInstanceOf(Error)
})
