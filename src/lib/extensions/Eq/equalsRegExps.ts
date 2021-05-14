// NOTE: 導入時点では webpack.config.dev.ts から使うためのものなので、 Node.js で動作すれば十分であり、 IE 対応は不要。
export default function equalsRegExps(x: RegExp, y: RegExp): boolean {
  return x.source === y.source && x.flags === y.flags
}
