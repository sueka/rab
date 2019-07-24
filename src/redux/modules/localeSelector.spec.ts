import { call, put, takeEvery } from 'redux-saga/effects'

import fetch from 'src/lib/fetch'

import {
  SELECT, SET_LOCALE, SET_MESSAGES, PUSH_ERROR,
  LocaleSelectorState,
  select, setLocale, setMessages, pushError,
  selectSaga, localeSelectorSaga,
  createLocaleSelectorReducer,
} from './localeSelector'

describe('action creators', () => {
  describe('select', () => {
    it('should return a select action', () => {
      expect(select('ja')).toEqual({
        type: SELECT,
        payload: {
          locale: 'ja',
        },
      })
    })
  })

  describe('setLocale', () => {
    it('should return a set locale action', () => {
      expect(setLocale('ja')).toEqual({
        type: SET_LOCALE,
        payload: {
          locale: 'ja',
        },
      })
    })
  })

  describe('setMessages', () => {
    it('should return a set messages action', () => {
      expect(setMessages({ blue: '青' })).toEqual({
        type: SET_MESSAGES,
        payload: {
          messages: { blue: '青' },
        },
      })
    })
  })

  describe('pushError', () => {
    it('should return a push error action', () => {
      expect(pushError(new Error('unavailable locale'))).toEqual({
        type: PUSH_ERROR,
        payload: new Error('unavailable locale'),
        error: true,
      })
    })
  })
})

describe('selectSaga', () => {
  const it = selectSaga(select('ja'))

  expect(it.next().value).toEqual(call(fetch, {
    method: 'GET',
    parameterizedEndpoint: '/messages/:locale.json',
    params: { locale: 'ja' },
  }))

  expect(it.next({ body: { blue: '青' } }).value).toEqual(put(setMessages({ blue: '青' })))
  expect(it.next().value).toEqual(put(setLocale('ja')))
})

describe('localeSelectorSaga', () => {
  const it = localeSelectorSaga()

  // TODO: 順不同にする
  expect(it.next().value).toEqual(takeEvery(SELECT, selectSaga))
})

describe('reducer', () => {
  const initialState: LocaleSelectorState = {
    availableLocales: ['en', 'ja'],
    locale: 'en',
    messages: {},
    errors: [],
  }

  const localeSelectorReducer = createLocaleSelectorReducer(initialState)

  it('should return the initial state', () => {
    expect(localeSelectorReducer(undefined, {
      type: '',
    })).toEqual(initialState)
  })

  it('should handle SELECT', () => {
    expect(localeSelectorReducer(initialState, select('ja'))).toEqual(initialState)
  })

  it('should handle SET_LOCALE', () => {
    expect(localeSelectorReducer(initialState, setLocale('ja'))).toEqual({
      ...initialState,
      locale: 'ja',
    })
  })

  it('should handle SET_MESSAGES', () => {
    expect(localeSelectorReducer(initialState, setMessages({ blue: '青' }))).toEqual({
      ...initialState,
      messages: { blue: '青' },
    })
  })

  it('should handle PUSH_ERROR', () => {
    const error = new Error()
    const state = localeSelectorReducer(initialState, pushError(error))

    expect(state).toMatchObject({
      ...initialState,
      errors: [
        ...initialState.errors,
        expect.any(Error),
      ],
    })

    expect(state.errors).toContain(error)
  })
})
