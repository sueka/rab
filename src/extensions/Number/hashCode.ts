import JSBI from 'jsbi'

export default function hashCode(x: number) {
  const v = doubleToLongBits(x)

  return Number(JSBI.bitwiseAnd(v, JSBI.BigInt(0xFFFFFFFF))) ^ Number(JSBI.signedRightShift(v, JSBI.BigInt(32)))
}

// TODO: Remove
function doubleToLongBits(value: number): JSBI {
  const ab = new ArrayBuffer(8)
  const doubleContainer = new Float64Array(ab, 0, 1)
  const uintContainer = new Uint32Array(ab, 0, 2) // NOTE: IE does not support BigUint64Array

  doubleContainer[0] = value // tslint:disable-line:no-object-mutation

  return JSBI.add((JSBI.leftShift(JSBI.BigInt(uintContainer[1]), JSBI.BigInt(32))), JSBI.BigInt(uintContainer[0]))
}
