import JSBI from 'jsbi'

export default function hashCode(x: number) {
  const v = doubleToLongBits(x)

  return Number(JSBI.bitwiseAnd(v, JSBI.BigInt(0xFFFFFFFF))) ^ Number(JSBI.signedRightShift(v, JSBI.BigInt(32)))
}

// TODO: Remove
function doubleToLongBits(value: number): JSBI {
  const buf = Buffer.allocUnsafe(8)

  buf.writeDoubleBE(value, 0)

  return JSBI.add((JSBI.leftShift(JSBI.BigInt(buf.readUInt32BE(0)), JSBI.BigInt(32))), JSBI.BigInt(buf.readUInt32BE(4)))
}
