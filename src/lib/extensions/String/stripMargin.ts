import typed from '~/lib/typed'

const eols = [
  '\n',
  '\r\n',
]

const eolPattern = new RegExp(typed<[string]>`(?:${ eols.join('|') })`)
const eolCharPattern = new RegExp(typed<[string]>`(?:${ eols.map((eol) => typed<[string]>`[${ eol }]`).join('|') })`)

export default function stripMargin(...args: Parameters<typeof stripMargin1>): ReturnType<typeof stripMargin1>
export default function stripMargin(...args: Parameters<typeof stripMargin2>): ReturnType<typeof stripMargin2>

export default function stripMargin(marginCharOrThat: string, that?: string): string {
  if (that === undefined) {
    return stripMargin1(marginCharOrThat)
  }

  return stripMargin2(marginCharOrThat, that)
}

function stripMargin1(that: string) {
  return stripMargin2('|', that)
}

function stripMargin2(marginChar: string, that: string) {
  let result = '' // tslint:disable-line:no-let

  // tslint:disable-next-line:no-loop-statement
  for (const line of generateLineWithEolIterator(that)) {
    const matches = new RegExp(typed<[string, string]>`^(?:[\\t ]*(?<marginChar>.))?(?<stripped>(?:.|${ eolCharPattern.source })*${ eolPattern.source }?)$`, 'u').exec(line)

    if (matches === null || matches.groups === undefined) {
      throw new Error // TODO
    }

    const { marginChar: marginCharCandidate, stripped } = matches.groups

    if (marginCharCandidate === marginChar) {
      result += stripped
    } else {
      result += line
    }
  }

  return result
}

function* generateLineWithEolIterator(cs: string) {
  let lineBuffer = '' // tslint:disable-line:no-let
  let eolBuffer = '' // tslint:disable-line:no-let

  // tslint:disable-next-line:no-loop-statement
  for (const c of cs) {
    lineBuffer += c

    if (eols.some((eol) => eol.startsWith(eolBuffer + c))) {
      eolBuffer += c
    }

    if (eols.includes(eolBuffer)) {
      yield lineBuffer
      lineBuffer = ''
      eolBuffer = ''
    }
  }

  if (lineBuffer !== '') {
    yield lineBuffer
  }
}
