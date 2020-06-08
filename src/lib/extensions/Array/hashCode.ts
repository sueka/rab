export default function hashCode<T extends boolean | number | string>(xs: T[]) {
  // tslint:disable-next-line:no-let
  let result = BigInt(1)

  // tslint:disable-next-line:no-loop-statement
  for (const x of xs) {
    result = result * BigInt(31) + BigInt(x.hashCode())
  }

  return Number(BigInt.asIntN(32, result))
}
