// TODO: Delete

import { StoreEnhancer, compose } from 'redux'
export {}

declare global {
  // TODO: Use globalThis
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: StoreEnhancer
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}
