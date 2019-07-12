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
  for (const [segment, substitution] of zipIterables(template.slice(1), substitutions)) {
    result += String(substitution)
    result += segment
  }

  return result
}
