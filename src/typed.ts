import zipIterables from './extensions/Iterable/zipIterables'

/**
 * Type substitutions of a template literal.  It is often used as a tag function.
 *
 * @returns a string of alternate elements of template and substitutions.
 */
export default function typed<T extends unknown[]>(template: TemplateStringsArray, ...substitutions: T): string {
  let result = template[0]!

  for (const [substitution, segment] of zipIterables(substitutions, template.slice(1))) {
    result += String(substitution)
    result += segment
  }

  return result
}
