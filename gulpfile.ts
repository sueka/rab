import { TaskFunction, parallel, series } from 'gulp'
import * as del from 'del'
import { exec } from 'child_process'

export const clean: TaskFunction = () => del(['dist', '**/*.css.d.ts', '**/*.js{,x}', '!node_modules/**'])
export const typeCheck = series(npxTask('tcm src -s'), npxTask('tsc --noEmit -p .'))
const tslint = npxTask('tslint -p .')
const stylelint = npxTask('stylelint src')
export const staticCheck = parallel(typeCheck, tslint, stylelint)
export const build = series(staticCheck, npxTask('parcel build src/index.html'))

function npx(cmd: string) {
  const cp = exec(cmd)

  cp.stdout.pipe(process.stdout)
  cp.stderr.pipe(process.stderr)

  return cp
}

function npxTask(cmd: string) {
  const task: TaskFunction = () => npx(cmd)

  task.displayName = cmd

  return task
}
