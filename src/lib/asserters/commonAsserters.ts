export function shouldBePresent<T>(it: T | null | undefined): asserts it is T {
  if (it == null) {
    throw new Error('It should be present.')
  }
}

export function shouldBeNullish<T>(it: T | null | undefined): asserts it is null | undefined {
  if (it != null) {
    throw new Error('It should be nullish.')
  }
}
