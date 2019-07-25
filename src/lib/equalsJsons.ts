import zipIterables from './zip/zipIterables'

export default function equalsJsons(a: Json, b: Json): boolean {
  if (a === null && b === null) {
    return true
  }

  if (
    typeof a === 'boolean' && typeof b === 'boolean' ||
    typeof a === 'number' && typeof b === 'number' ||
    typeof a === 'string' && typeof b === 'string'
  ) {
    return a === b
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    return equalsJsonArrays(a, b)
  }

  if (
    a === null || typeof a === 'boolean' || typeof a === 'number' || typeof a === 'string' || Array.isArray(a) ||
    b === null || typeof b === 'boolean' || typeof b === 'number' || typeof b === 'string' || Array.isArray(b)
  ) {
    return false
  }

  return equalsJsonObjects(a, b)
}

function equalsJsonArrays(xs: JsonArray, ys: JsonArray): boolean {
  if (xs.length !== ys.length) {
    return false
  }

  // tslint:disable-next-line:no-loop-statement
  for (const [x, y] of zipIterables(xs, ys)) {
    if (!equalsJsons(x, y)) {
      return false
    }
  }

  return true
}

function equalsJsonObjects(a: JsonObject, b: JsonObject): boolean {
  const is = Object.keys(a)
  const js = Object.keys(b)

  // NOTE: 無くてもよいが、パフォーマンスのため。
  if (is.length !== js.length) {
    return false
  }

  is.sort() // tslint:disable-line:no-array-mutation
  js.sort() // tslint:disable-line:no-array-mutation

  if (!equalsJsonArrays(is, js)) {
    return false
  }

  // tslint:disable-next-line:no-loop-statement
  for (const i of is) {
    if (!equalsJsons(a[i], b[i])) {
      return false
    }
  }

  return true
}
