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
const extractMessages = npxTask('extract-messages', ['--flat', '--default-locale=en', '--locales=en,ja', '--output=public/messages', 'src/**/messages.ts'])
const preTypeCheck = parallel(npxTask('tcm', ['src', '-s']), extractMessages)
const typeCheck = series(preTypeCheck, npxTask('tsc', ['--noEmit', '-p', '.']))
const typeCheckForTesting = series(preTypeCheck, npxTask('tsc', ['--noEmit', '-p', './tsconfig.test.json']))
const tslint = npxTask('tslint', ['-p', '.'])
const stylelint = npxTask('stylelint', ['src/**/*.css'])
export const lint = parallel(tslint, stylelint)
const testWithoutCoverage = series(typeCheckForTesting, npxTask('jest'))
const testWithCoverage = series(typeCheckForTesting, npxTask('jest', ['--coverage']))
export const testInWatchMode = series(preTypeCheck, npxTask('jest', ['--onlyChanged', '--watch', '--watchPathIgnorePatterns', '\'\\.css\\.d\\.ts$\''])) // TODO: interrupt に preTypeCheck を差し込む
export const updateSnapshot = series(typeCheckForTesting, npxTask('jest', ['--updateSnapshot']))
export const test = testWithCoverage
export const build = parallel(typeCheck, series(() => del(['dist/**/*']), npxTask('webpack')))
export const buildStorybook = parallel(typeCheck, npxTask('build-storybook'))
export const buildGhPagesCustom404Page = series(() => del(['gh-pages/dist/**/*']), typeCheck, npxTask('webpack', ['--config', 'gh-pages/webpack.config.ts']))
export const document = parallel(npxTask('typedoc'))

export const develop = parallel(
  continuousTask('src', typeCheck),
  continuousTask('src', lint),
  npxTask('webpack-dev-server', ['--mode', 'development', '--hot']),
  npxTask('start-storybook', ['--ci', '--quiet', '-p', '5678'])
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

  return series(task) // name automatically
}

function continuousTask(globs: Globs, watchedTask: TaskFunction) {
  const task = () => watch(globs, { ignoreInitial: false, ignored }, watchedTask)

  task.displayName = `${ watchedTask.displayName } --watch`

  return task
}
