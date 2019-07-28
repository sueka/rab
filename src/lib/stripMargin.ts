export default function stripMargin(...args: Parameters<typeof stripMargin2>): ReturnType<typeof stripMargin2>
export default function stripMargin(...args: Parameters<typeof stripMargin1>): ReturnType<typeof stripMargin1>
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
  let result = ''

  for (const line of generateLineWithEolIterator(that)) {
    const matches = /^(?:[\t ]*(?<marginChar>.))?(?<stripped>(?:.|\r)*\n?)$/u.exec(line)

    if (matches === null || matches.groups === undefined) {
      throw new Error() // TODO
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
  let line = ''

  for (const c of cs) {
    switch (c) {
      case '\n':
        line += c
        yield line
        line = ''
        break

      default:
        line += c

    }
  }

  if (line !== '') {
    yield line
  }
}
