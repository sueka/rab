import { TaskFunction, parallel, series } from 'gulp'
import * as del from 'del'
import { exec } from 'child_process'

export const clean: TaskFunction = () => del(['dist', '**/*.css.d.ts', '!node_modules/**'])
export const typeCheck = series(npx('tcm src -s'), npx('tsc --noEmit -p .'))
const tslint = npx('tslint -p .')
const stylelint = npx('stylelint src')
export const staticCheck = parallel(typeCheck, tslint, stylelint)
export const build = series(staticCheck, npx('parcel build src/index.html'))

function npx(cmd: string) {
  const task: TaskFunction = () => {
    const cp = exec(cmd)

    cp.stdout.pipe(process.stdout)
    cp.stderr.pipe(process.stderr)

    return cp
  }

  task.displayName = cmd

  return task
}
