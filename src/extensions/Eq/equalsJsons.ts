import zipIterables from '~/extensions/Iterable/zipIterables'

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

  if (is.length !== js.length) {
    return false
  }

  is.sort()
  js.sort()

  for (const [i, j] of zipIterables(is, js)) {
    if (i !== j) {
      return false
    }

    const x = iXMap[i]! // i は元々 iXMap の key なので、存在する。
    const y = jYMap[j]! // 同上

    if (!equalsJsons(x, y)) {
      return false
    }
  }

  return true
}
