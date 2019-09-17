import zipIterables from '~/lib/extensions/Iterable/zipIterables'

export default function equalsJsons(x: Json, y: Json): boolean {
  if (x === null && y === null) {
    return true
  }

  if (
    typeof x === 'boolean' && typeof y === 'boolean' ||
    typeof x === 'number' && typeof y === 'number' ||
    typeof x === 'string' && typeof y === 'string'
  ) {
    return x === y
  }

  if (Array.isArray(x) && Array.isArray(y)) {
    return equalsJsonArrays(x, y)
  }

  if (
    x === null || typeof x === 'boolean' || typeof x === 'number' || typeof x === 'string' || Array.isArray(x) ||
    y === null || typeof y === 'boolean' || typeof y === 'number' || typeof y === 'string' || Array.isArray(y)
  ) {
    return false
  }

  return equalsJsonObjects(x, y)
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

function equalsJsonObjects(iXMap: JsonObject, jYMap: JsonObject): boolean {
  const is = Object.keys(iXMap)
  const js = Object.keys(jYMap)

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
    const j = i
    const x = iXMap[i]
    const y = jYMap[j]

    if (!equalsJsons(x, y)) {
      return false
    }
  }

  return true
}
