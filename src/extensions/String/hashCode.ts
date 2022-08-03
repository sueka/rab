export default function hashCode(s: string) {
  let result = 0

  for (let i = 0; i < s.length; ++i) {
    result = 31 * result + s.charCodeAt(i)
  }

  return result
}
