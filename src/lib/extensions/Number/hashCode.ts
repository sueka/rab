export default function hashCode(x: number) {
  const v = doubleToLongBits(x)

  return Number(v & BigInt(0xFFFFFFFF)) ^ Number(v >> BigInt(32))
}

// TODO: remove
function doubleToLongBits(value: number): bigint {
  const buf = Buffer.allocUnsafe(8)

  buf.writeDoubleBE(value, 0)

  return (BigInt(buf.readUInt32BE(0)) << BigInt(32)) + BigInt(buf.readUInt32BE(4))
}
