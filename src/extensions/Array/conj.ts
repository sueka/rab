import UnreachableError from '~/errors/UnreachableError'
import typed from '~/typed'

/**
 * @throws `TypeError` if the size of `xs` is less than two.
 *
 * @example
 * ``` ts
 * conj(['A', 'B', 'C'], ', ', ' or ') // 'A, B or C'
 * ```
 */
export default function conj(xs: readonly string[], separator: string, lastSeparator: string): string {
  if (xs.length < 2) {
    throw new TypeError(typed<[string]>`The size of ${ xs.toString() } is less than two.`)
  }

  const [initXs, lastX] = [xs.slice(0, -1), xs.slice(-1)[0]] as [string[], string?]

  if (lastX === undefined) {
    throw new UnreachableError
  }

  return typed<[string, string, string]>`${ initXs.join(separator) }${ lastSeparator }${ lastX }`
}
