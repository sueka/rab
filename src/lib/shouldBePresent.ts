export default function shouldBePresent<T>(it: T | null | undefined): asserts it is T {
  if (it == null) {
    throw new Error //
  }
}
