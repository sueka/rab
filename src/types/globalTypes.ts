// TODO: remove

import { compose } from 'redux'
export {}

declare global {
  interface ArrayConstructor {
    isArray(arg: unknown): arg is readonly unknown[]
  }

  interface ObjectConstructor {
    entries<K extends Index, V>(o: Record<K, V> | ArrayLike<V>): Array<[K, V]>
  }

  // TODO: use globalThis
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}
