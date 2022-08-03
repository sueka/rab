import TimestampableNotification from '~/polyfills/TimestampableNotification'

export {}

// NOTE: TimestampableNotification はネイティブの Notification に依存するので、ネイティブの Notification が無い場合はポリフィルをスキップする。
if ('Notification' in globalThis || globalThis.Notification !== undefined) {
  Object.defineProperty(globalThis, 'Notification', {
    value: TimestampableNotification ?? Notification,
  })
}
