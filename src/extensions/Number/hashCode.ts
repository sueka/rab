import JSBI from 'jsbi'

export default function hashCode(x: number) {
  const v = doubleToLongBits(x)

  return JSBI.toNumber(JSBI.bitwiseAnd(v, JSBI.BigInt(0xFFFFFFFF))) ^ JSBI.toNumber(JSBI.signedRightShift(v, JSBI.BigInt(32)))
}

// TODO: Remove
function doubleToLongBits(value: number): JSBI {
  const ab = new ArrayBuffer(8)
  const doubleContainer = new Float64Array(ab, 0, 1)
  const uintContainer = new Uint32Array(ab, 0, 2)

  doubleContainer[0] = value

  return JSBI.add((JSBI.leftShift(JSBI.BigInt(uintContainer[1]!), JSBI.BigInt(32))), JSBI.BigInt(uintContainer[0]!))
}
