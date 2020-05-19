export default function hashCode(x: number) {
  const v = doubleToLongBits(x)

  return Number(v & (1n << 32n) - 1n) ^ Number(v >> 32n)
}

// TODO: remove
function doubleToLongBits(value: number): bigint {
  const buf = Buffer.allocUnsafe(8)

  buf.writeDoubleBE(value, 0)

  return (BigInt(buf.readUInt32BE(0)) << 32n) + BigInt(buf.readUInt32BE(4))
}
