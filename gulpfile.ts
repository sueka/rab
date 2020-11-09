import { ChildProcess, spawn } from 'child_process'
import del from 'del'
import { TaskFunction, Globs, parallel, series, watch } from 'gulp'

const ignored = ['.cache', 'coverage', 'dist', 'doc', 'storybook-static', '**/*.js{,x}', '!jest.config.js', '!typedoc.js']

//
//   _|                          _|
// _|_|_|_|    _|_|_|    _|_|_|  _|  _|      _|_|_|
//   _|      _|    _|  _|_|      _|_|      _|_|
//   _|      _|    _|      _|_|  _|  _|        _|_|
//     _|_|    _|_|_|  _|_|_|    _|    _|  _|_|_|
//
//

export const clean: TaskFunction = describedTask(
  'Remove all files that neither are tracked by Git, are in node_modules/ nor are .env`',
  () => del([...ignored, '!node_modules/**', '!.env'])
)

export const extractMessages = npxTask('extract-messages', ['--flat', '--default-locale=en', '--locales=en,ja,he', '--output=public/messages', 'src/**/messages.ts'])
export const tcm = npxTask('tcm', ['src', '-s'])
const typeCheck = npxTask('tsc', ['--noEmit', '-p', './tsconfig.prod.json'])
const typeCheckForDevelopment = npxTask('tsc', ['--noEmit', '-p', '.'])
const eslint = npxTask('eslint', ['--ext', '.ts, .tsx', 'src'])
const tslint = npxTask('tslint', ['-p', '.'])
const stylelint = npxTask('stylelint', ['src/**/*.css'])
export const lint = parallel(eslint, tslint, stylelint)
const testWithoutCoverage = parallel(typeCheckForDevelopment, npxTask('jest'))
const testWithCoverage = parallel(typeCheckForDevelopment, npxTask('jest', ['--coverage']))

export const testInWatchMode = series(
  parallel(extractMessages, tcm), // TODO: interrupt に差し込む
  npxTask('jest', ['--onlyChanged', '--watch'])
)

export const updateSnapshots = parallel(typeCheckForDevelopment, npxTask('jest', ['--updateSnapshot']))
export const test = testWithCoverage
export const build = parallel(typeCheck, series(() => del(['dist/**/*']), npxTask('webpack', ['--config', 'webpack.config.ts'])))

export const buildStorybook = parallel(
  typeCheckForDevelopment,
  npxTask('build-storybook', [], { NODE_ENV: process.env.NODE_ENV ?? 'development' })
)

export const buildGhPagesCustom404Page = parallel(typeCheck, series(() => del(['gh-pages/dist/**/*']), npxTask('webpack', ['--config', 'gh-pages/webpack.config.ts'])))
export const document = npxTask('typedoc')

export const develop = series(
  parallel(extractMessages, tcm), // TODO: interrupt に差し込む
  parallel(
    continuousTask('src', typeCheck),
    continuousTask('src', lint),
    npxTask('webpack', ['serve', '--config', 'webpack.config.dev.ts', '--hot'])/* ,
    npxTask('start-storybook', ['--ci', '--quiet', '-p', '5678']) */ // TODO: https://github.com/storybookjs/storybook/issues/9216 が解決したら元に戻す。 Storybook 要らないかも。
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

function npx(util: string, args: string[], env: NodeJS.ProcessEnv): ChildProcess {
  return spawn(util, args, { stdio: 'inherit', env: { ...process.env, ...env } })
}

declare global {
  interface ObjectConstructor {
    entries(o: boolean | number | symbol): [string, never][]
    entries(o: string): [string, string][]
    entries<T>(o: ArrayLike<T> | Record<string, T>): [string, T][]
  }
}

function npxTask(util: string, args: string[] = [], env: NodeJS.ProcessEnv = {}): TaskFunction {
  const task: TaskFunction = () => npx(util, args, env)

  task.displayName = `${ Object.entries(env).map(([name, value]) => `${ name }=${ value } `).join('') }${ util }${ args.map((arg) => /\s/.test(arg) ? ` '${ arg }'` : ` ${ arg }`).join('') }`

  return series(task) // name automatically
}

function continuousTask(globs: Globs, watchedTask: TaskFunction): TaskFunction {
  const task = () => watch(globs, { ignoreInitial: false, ignored }, watchedTask)

  task.displayName = `${ watchedTask.displayName } --watch`

  return task
}

function describedTask(description: string, task: TaskFunction): TaskFunction {
  task.description = description

  return task
}
