import { ChildProcess, spawn } from 'child_process'
import del from 'del'
import { TaskFunction, Globs, parallel, series, watch } from 'gulp'
import shell from 'gulp-shell'

// .gitignore
const ignored = [
  'node_modules/',
  'dist/',
  '.env',
  '**/*.js{,x}',
  '!babel.config.js',
  'coverage/',
  '!jest.config.js',
  'doc/',
  '!typedoc.js',
  'src/crate/pkg/',
  'src/crate/target/',
  '.cache/',
]

//
//   _|                          _|
// _|_|_|_|    _|_|_|    _|_|_|  _|  _|      _|_|_|
//   _|      _|    _|  _|_|      _|_|      _|_|
//   _|      _|    _|      _|_|  _|  _|        _|_|
//     _|_|    _|_|_|  _|_|_|    _|    _|  _|_|_|
//
//

const wasmPack = shell.task('make wasm-pack')
export const extractMessages = npxTask('extract-messages', ['--flat', '--default-locale=en', '--locales=en,he,ja', '--output=public/messages', 'src/**/messages.ts'])
export const tcm = series(npxTask('tcm', ['src', '-s']), () => del('src/classes.css.d.ts'))
const typeCheck = shell.task('make type-check')
const typeCheckForDevelopment = npxTask('tsc', ['--noEmit', '-p', '.'])
const eslint = npxTask('eslint', ['--ext', '.ts, .tsx', 'src'])
const tslint = npxTask('tslint', ['-p', '.'])
const stylelint = npxTask('stylelint', ['src/**/*.css'])
export const lint = parallel(eslint, tslint, stylelint)
const testWithoutCoverage = series(wasmPack, parallel(typeCheckForDevelopment, npxTask('jest')))
const testWithCoverage = series(wasmPack, parallel(typeCheckForDevelopment, npxTask('jest', ['--coverage'])))

export const testInWatchMode = series(
  parallel(extractMessages, tcm), // TODO: interrupt に差し込む
  npxTask('jest', ['--onlyChanged', '--watch'])
)

export const updateSnapshots = series(wasmPack, parallel(typeCheckForDevelopment, npxTask('jest', ['--updateSnapshot'])))
export const test = testWithCoverage
const build = shell.task('make')

export const buildGhPagesCustom404Page = parallel(typeCheck, series(() => del(['gh-pages/dist/**/*']), npxTask('webpack', ['--config', 'gh-pages/webpack.config.ts'])))
export const document = series(wasmPack, npxTask('typedoc'))

export const develop = series(
  parallel(
    extractMessages, tcm, // TODO: interrupt に差し込む
    wasmPack
  ),
  parallel(
    continuousTask('src', typeCheck),
    continuousTask('src', lint),
    npxTask('webpack', ['serve', '--config', 'webpack.config.dev.ts'])
  )
)

export default parallel(testWithoutCoverage, build)

//
// _|                  _|
// _|_|_|      _|_|    _|  _|_|_|      _|_|    _|  _|_|    _|_|_|
// _|    _|  _|_|_|_|  _|  _|    _|  _|_|_|_|  _|_|      _|_|
// _|    _|  _|        _|  _|    _|  _|        _|            _|_|
// _|    _|    _|_|_|  _|  _|_|_|      _|_|_|  _|        _|_|_|
//                         _|
//                         _|

function npx(util: string, args: readonly string[], env: NodeJS.ProcessEnv): ChildProcess {
  return spawn(util, args, { stdio: 'inherit', env: { ...process.env, ...env } })
}

declare global {
  interface ObjectConstructor {
    entries(o: boolean | number | symbol): [string, never][]
    entries(o: string): [string, string][]
    entries<T>(o: ArrayLike<T> | Record<string, T>): [string, T][]
  }
}

function npxTask(util: string, args: readonly string[] = [], env: NodeJS.ProcessEnv = {}): TaskFunction {
  const task: TaskFunction = () => npx(util, args, env)

  task.displayName = `${ Object.entries(env).map(([name, value]) => `${ name }=${ value } `).join('') }${ util }${ args.map((arg) => /\s/.test(arg) ? ` '${ arg }'` : ` ${ arg }`).join('') }`

  return series(task) // name automatically
}

function continuousTask(globs: Globs, watchedTask: TaskFunction): TaskFunction {
  const task = () => watch(globs, { ignoreInitial: false, ignored }, watchedTask)

  task.displayName = `${ watchedTask.displayName } --watch`

  return task
}
