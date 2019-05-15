import { TaskFunction, Globs, parallel, series, watch } from 'gulp'
import del from 'del'
import { exec } from 'child_process'

const ignored = ['.cache', 'coverage', 'dist', 'storybook-static', '**/*.css.d.ts', '**/*.js{,x}', '!jest.config.js']

//
//   _|                          _|
// _|_|_|_|    _|_|_|    _|_|_|  _|  _|      _|_|_|
//   _|      _|    _|  _|_|      _|_|      _|_|
//   _|      _|    _|      _|_|  _|  _|        _|_|
//     _|_|    _|_|_|  _|_|_|    _|    _|  _|_|_|
//
//

export const clean: TaskFunction = () => del([...ignored, '!node_modules/**', '!.env'])
const preTypeCheck = npxTask('tcm src -s')
export const typeCheck = series(preTypeCheck, npxTask('tsc --noEmit -p .'))
const tslint = npxTask('tslint -p .')
const stylelint = npxTask('stylelint src')
export const staticCheck = namedTask('staticCheck', parallel(series(typeCheck, tslint), stylelint))
const testWithoutCoverage = series(preTypeCheck, npxTask('jest'))
const testWithCoverage = series(preTypeCheck, npxTask('jest --coverage'))
export const test = testWithCoverage
export const build = series(typeCheck, npxTask('webpack'))
export const buildStorybook = series(typeCheck, npxTask('build-storybook'))

export const develop = parallel(
  continuousTask('src', staticCheck),
  series(preTypeCheck, npxTask('jest --watch --watchPathIgnorePatterns \'\\.css\\.d\\.ts$\'')),
  npxTask('webpack-dev-server --config webpack.config.dev.ts'),
  npxTask('start-storybook --ci --quiet -p 5678'),
)

export default series(testWithoutCoverage, build)

//
// _|                  _|
// _|_|_|      _|_|    _|  _|_|_|      _|_|    _|  _|_|    _|_|_|
// _|    _|  _|_|_|_|  _|  _|    _|  _|_|_|_|  _|_|      _|_|
// _|    _|  _|        _|  _|    _|  _|        _|            _|_|
// _|    _|    _|_|_|  _|  _|_|_|      _|_|_|  _|        _|_|_|
//                         _|
//                         _|

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
