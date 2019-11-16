export const isOneOf = <T extends readonly Json[]>(...options: T) => (input: unknown): input is T[number] => options.some((option) => option === input)

export const optional = <T extends unknown>(isT: (input: unknown) => input is T) => (input: unknown | undefined): input is T | undefined => {
  if (input === undefined) {
    return true
  }

  return isT(input)
}
