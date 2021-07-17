import fromEntries from '~/polyfills/Object.fromEntries'

export {}

declare global {
  interface ObjectConstructor {
    fromEntries: typeof fromEntries
  }
}

if (!('fromEntries' in Object)) {
  Object.defineProperty(Object, 'fromEntries', {
    value: fromEntries,
  })
}
