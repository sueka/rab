import { UnreachableError } from './errors'
import zipIterables from './zip/zipIterables'

export const doNothing = () => {
  // Silence is golden.
}

// const identity = <T>(x: T): T => x

export const delay = (ms: number) => new Promise((res) => { setTimeout(res, ms) })

/**
 * Returns a string of alternate elements of template and substitutions.  It is often used as a tag function.
 */
export function typed<T extends unknown[]>(template: TemplateStringsArray, ...substitutions: T): string {
  // tslint:disable-next-line:no-let
  let result = template[0]

  // tslint:disable-next-line:no-loop-statement
  for (const [substitution, segment] of zipIterables(substitutions, template.slice(1))) {
    result += String(substitution)
    result += segment
  }

  return result
}

/**
 * @throw {TypeError} if the size of {xs} is less than two.
 *
 * @example
 * conj(', ', ' or ', ['A', 'B', 'C']) // 'A, B or C'
 */
export function conj(separator: string, lastSeparator: string, xs: string[]): string {
  if (xs.length < 2) {
    throw new TypeError(typed<[string]>`The size of ${ xs.toString() } is less than two.`)
  }

  const lastX = xs.pop()

  if (lastX === undefined) {
    throw new UnreachableError()
  }

  return typed<[string, string, string]>`${ xs.join(separator) }${ lastSeparator }${ lastX }`
}
