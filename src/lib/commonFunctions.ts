import zipIterables from './zip/zipIterables'

export const doNothing = () => {
  // Silence is golden.
}

// const identity = <T>(x: T): T => x

export const delay = (ms: number) => new Promise((res) => { setTimeout(res, ms) })

export function typed<T extends unknown[]>(template: TemplateStringsArray, ...substitutions: T): string {
  let result = template[0]

  for (const [segment, substitution] of zipIterables(template.slice(1), substitutions)) {
    result += String(substitution)
    result += segment
  }

  return result
}
