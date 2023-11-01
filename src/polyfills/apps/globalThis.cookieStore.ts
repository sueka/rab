import cookieStore from '~/polyfills/cookieStore'

declare global {
  interface Window { // TODO: Prefer globalThis
    cookieStore?: typeof cookieStore
  }
}

declare const globalThis: Window

if (!('cookieStore' in globalThis)) {
  Object.defineProperty(globalThis, 'cookieStore', {
    value: cookieStore,
  })
}
