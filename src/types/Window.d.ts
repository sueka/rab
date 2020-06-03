// TODO: remove

import { compose } from 'redux'
export {}

declare global {
  // TODO: use globalThis
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}
