import JSBI from 'jsbi'

export default function hashCode<T extends boolean | number | string>(xs: readonly T[]) {
  let result = JSBI.BigInt(1)

  for (const x of xs) {
    result = JSBI.add(JSBI.multiply(result, JSBI.BigInt(31)), JSBI.BigInt(x.hashCode()))
  }

  return JSBI.toNumber(JSBI.asIntN(32, result))
}
