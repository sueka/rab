import UnreachableError from '~/lib/errors/UnreachableError'
import typed from '~/lib/typed'

/**
 * @throws [[TypeError]] if the size of `xs` is less than two.
 *
 * @example
 * ``` ts
 * conj(['A', 'B', 'C'], ', ', ' or ') // 'A, B or C'
 * ```
 */
export default function conj(xs: string[], separator: string, lastSeparator: string): string {
  if (xs.length < 2) {
    throw new TypeError(typed<[string]>`The size of ${ xs.toString() } is less than two.`)
  }

  const lastX = xs.pop() // tslint:disable-line:no-array-mutation

  if (lastX === undefined) {
    throw new UnreachableError
  }

  return typed<[string, string, string]>`${ xs.join(separator) }${ lastSeparator }${ lastX }`
}
