export default function hashCode<T extends boolean | number | string>(xs: readonly T[]) {
  let result = 1n

  for (const x of xs) {
    result = result * 31n + BigInt(x.hashCode())
  }

  return Number(BigInt.asIntN(32, result))
}
