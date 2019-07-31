import typed from 'src/lib/typed'

export default function trimEols(s: string) {
  return trimTrailingEols(trimLeadingEols(s))
}

const eolPattern = /(?:\r?\n)/

function trimLeadingEols(s: string) {
  return s.replace(new RegExp(typed<[string]>`^${ eolPattern.source }*`), '')
}

function trimTrailingEols(s: string) {
  return s.replace(new RegExp(typed<[string]>`${ eolPattern.source }*$`), '')
}
