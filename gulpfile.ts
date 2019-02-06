import { TaskFunction, Globs, parallel, series, watch } from 'gulp'
import del from 'del'
import { exec } from 'child_process'

const ignored = ['.cache', 'coverage', 'dist', 'storybook-static', '**/*.css.d.ts', '**/*.js{,x}', '!jest.config.js']

export const clean: TaskFunction = () => del([...ignored, '!node_modules/**'])
export const typeCheck = series(npxTask('tcm src -s'), npxTask('tsc --noEmit -p .'))
const tslint = npxTask('tslint -p .')
const stylelint = npxTask('stylelint src')
export const staticCheck = namedTask('staticCheck', parallel(typeCheck, tslint, stylelint))
const testWithoutCoverage = series(staticCheck, npxTask('jest'))
const testWithCoverage = series(staticCheck, npxTask('jest --coverage'))
export const test = testWithCoverage
export const build = series(typeCheck, npxTask('webpack --env.prod'))
export const buildStorybook = series(typeCheck, npxTask('build-storybook'))

export const develop = parallel(
  continuousTask('src', staticCheck),
  npxTask('jest --watch --watchPathIgnorePatterns \'\\.css\\.d\\.ts$\''),
  npxTask('webpack-dev-server'),
  npxTask('start-storybook --ci --quiet -p 5678'),
)

export default series(testWithoutCoverage, build)

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

function namedTask(name: string, task: TaskFunction) {
  task.displayName = name

  return task
}

function continuousTask(globs: Globs, watchedTask: TaskFunction) {
  const task = () => watch(globs, { ignoreInitial: false, ignored }, watchedTask)

  task.displayName = `${watchedTask.displayName} --watch`

  return task
}
