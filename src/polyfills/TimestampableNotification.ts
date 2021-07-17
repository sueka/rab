class TimestampableNotification extends Notification {
  private _timestamp: number

  constructor(...args: ConstructorParameters<typeof Notification>) {
    super(...args)

    this._timestamp = new Date().getTime()
  }

  public override get timestamp() {
    return this._timestamp
  }
}

// NOTE: undefined を継承すると super() が失敗する
export default ('Notification' in globalThis && !('timestamp' in Notification.prototype))
  ? TimestampableNotification
  : undefined
