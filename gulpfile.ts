import { parallel } from 'gulp'
import { exec, execSync } from 'child_process'

export const staticCheck = parallel(typeCheck, tslint, stylelint)

export function typeCheck() {
  execSync('tcm src')

  const cp = exec('tsc --noEmit -p .')

  cp.stdout.pipe(process.stdout)
  cp.stderr.pipe(process.stderr)

  return cp
}

function tslint() {
  const cp = exec('tslint -p .')

  cp.stdout.pipe(process.stdout)
  cp.stderr.pipe(process.stderr)

  return cp
}

function stylelint() {
  const cp = exec('stylelint src')

  cp.stdout.pipe(process.stdout)
  cp.stderr.pipe(process.stderr)

  return cp
}
