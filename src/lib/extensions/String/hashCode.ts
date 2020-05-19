export default function hashCode(s: string) {
  // tslint:disable-next-line:no-let
  let result = 0

  // tslint:disable-next-line:no-loop-statement
  for (const c of s.split('')) {
    result = 31 * result + c.charCodeAt(0)
  }

  return result
}
