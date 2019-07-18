import { TaskFunction, Globs, parallel, series, watch } from 'gulp'
import del from 'del'
import { spawn } from 'child_process'

const ignored = ['.cache', 'coverage', 'dist', 'doc', 'storybook-static', '**/*.css.d.ts', '**/*.js{,x}', '!jest.config.js', '!typedoc.js']

//
//   _|                          _|
// _|_|_|_|    _|_|_|    _|_|_|  _|  _|      _|_|_|
//   _|      _|    _|  _|_|      _|_|      _|_|
//   _|      _|    _|      _|_|  _|  _|        _|_|
//     _|_|    _|_|_|  _|_|_|    _|    _|  _|_|_|
//
//

export const clean: TaskFunction = () => del([...ignored, '!node_modules/**', '!.env'])
const extractMessages = npxTask('extract-messages', ['--flat', '--default-locale=en', '--locales=en,ja', '--output=public/locales', 'src/**/messages.ts'])
const preTypeCheck = parallel(npxTask('tcm', ['src', '-s']), extractMessages)
export const typeCheck = series(preTypeCheck, npxTask('tsc', ['--noEmit', '-p', '.']))
const tslint = npxTask('tslint', ['-p', '.'])
const stylelint = npxTask('stylelint', ['src/**/*.css'])
export const staticCheck = namedTask('staticCheck', parallel(series(typeCheck, tslint), stylelint))
const testWithoutCoverage = series(preTypeCheck, npxTask('jest'))
const testWithCoverage = series(preTypeCheck, npxTask('jest', ['--coverage']))
export const test = testWithCoverage
export const build = series(() => del(['dist/**/*']), typeCheck, npxTask('webpack'))
export const buildStorybook = series(typeCheck, npxTask('build-storybook'))
export const document = parallel(npxTask('typedoc'))

export const develop = parallel(
  continuousTask('src/**/messages.ts', extractMessages),
  continuousTask('src', staticCheck),
  series(preTypeCheck, npxTask('jest', ['--watch', '--watchPathIgnorePatterns', '\'\\.css\\.d\\.ts$\''], {
    CI: 'true', // to prevent screen being cleared
  })),
  npxTask('webpack-dev-server', ['--config', 'webpack.config.dev.ts']),
  npxTask('start-storybook', ['--ci', '--quiet', '-p', '5678']),
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

function npx(util: string, args: string[], env: NodeJS.ProcessEnv) {
  return spawn(util, args, { stdio: 'inherit', env: { ...process.env, ...env } })
}

declare global {
  interface ObjectConstructor {
    entries(o: boolean | number | symbol): [string, never][]
    entries(o: string): [string, string][]
    entries<T>(o: ArrayLike<T> | Record<string, T>): [string, T][]
  }
}

function npxTask(util: string, args: string[] = [], env: NodeJS.ProcessEnv = {}) {
  const task: TaskFunction = () => npx(util, args, env)

  task.displayName = `${ Object.entries(env).map(([name, value]) => `${ name }=${ value } `).join('') }${ util }${ args.map((arg) => ` ${ arg }`).join('') }`

  return task
}

function namedTask(name: string, task: TaskFunction) {
  task.displayName = name

  return task
}

function continuousTask(globs: Globs, watchedTask: TaskFunction) {
  const task = () => watch(globs, { ignoreInitial: false, ignored }, watchedTask)

  task.displayName = `${ watchedTask.displayName } --watch`

  return task
}
