export default function hashCode(x: number) {
  const v = doubleToLongBits(x)

  return v ^ (v / 2 ** 32)
}

// TODO: remove
function doubleToLongBits(value: number): number {
  const buf = Buffer.allocUnsafe(8)

  buf.writeDoubleBE(value, 0)

  return 2 ** 32 * buf.readUInt32BE(0) + buf.readUInt32BE(4)
}
