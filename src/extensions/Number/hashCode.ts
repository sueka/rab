export default function hashCode(x: number) {
  const v = doubleToLongBits(x)

  return Number(v & 0xFFFFFFFFn) ^ Number(v >> 32n)
}

// TODO: Remove
function doubleToLongBits(value: number): bigint {
  const ab = new ArrayBuffer(8)
  const doubleContainer = new Float64Array(ab, 0, 1)
  const uintContainer = new Uint32Array(ab, 0, 2)

  doubleContainer[0] = value

  return (BigInt(uintContainer[1]!) << 32n) + BigInt(uintContainer[0]!)
}
