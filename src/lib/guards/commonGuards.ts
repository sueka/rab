import identity from '~/lib/identity'

export const isOneOf = <T extends readonly Json[]>(...options: T) => (input: unknown): input is T[number] => options.some((option) => option === input)

export const optional = <T extends unknown>(isT: (input: unknown) => input is T) => (input: unknown | undefined): input is T | undefined => {
  if (input === undefined) {
    return true
  }

  return isT(input)
}

export const isObject = <K extends Index, V, A extends Record<K, V>, T extends A>(isT: (input: Record<K, V>) => Record<K, boolean>) => (input: A): input is T => {
  return Object.values<boolean>(isT(input)).every(identity)
}
