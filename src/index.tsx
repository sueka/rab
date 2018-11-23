import '@babel/polyfill'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { incrementAsyncSaga } from './redux/modules/counter'

import { App } from './components/App'

import { configureStore } from './redux'

const store = configureStore()

store.runSaga(incrementAsyncSaga)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
