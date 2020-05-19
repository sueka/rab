export default function hashCode(s: string) {
  // tslint:disable-next-line:no-let
  let result = 0

  // tslint:disable-next-line:no-loop-statement
  for (let i = 0; i < s.length; ++i) {
    result = 31 * result + s.charCodeAt(i)
  }

  return result
}
