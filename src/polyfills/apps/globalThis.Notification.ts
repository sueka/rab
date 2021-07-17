import TimestampableNotification from '~/polyfills/TimestampableNotification'

export {}

Object.defineProperty(globalThis, 'Notification', {
  value: TimestampableNotification ?? Notification,
})
