import { typed } from './commonFunctions'

export default function trimEols(s: string) {
  return trimTrailingEols(trimLeadingEols(s))
}

const eolPattern = /(?:\r?\n)/

function trimLeadingEols(s: string) {
  return s.replace(new RegExp(typed<[string, string]>`(?<=^${ eolPattern.source }*)${ eolPattern.source }`, 'g'), '')
}

function trimTrailingEols(s: string) {
  return s.replace(new RegExp(typed<[string, string]>`${ eolPattern.source }(?=${ eolPattern.source }*$)`, 'g'), '')
}
