import JSBI from 'jsbi'

export default function hashCode<T extends boolean | number | string>(xs: readonly T[]) {
  // tslint:disable-next-line:no-let
  let result = JSBI.BigInt(1)

  // tslint:disable-next-line:no-loop-statement
  for (const x of xs) {
    result = JSBI.add(JSBI.multiply(result, JSBI.BigInt(31)), JSBI.BigInt(x.hashCode()))
  }

  return Number(JSBI.asIntN(32, result))
}
