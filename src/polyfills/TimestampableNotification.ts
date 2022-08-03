// NOTE: undefined を継承すると super に失敗するため、 class {} にフォールバックする。
class TimestampableNotification
  extends (globalThis.Notification ?? class {})
{
  private _timestamp: number

  constructor(...args: ConstructorParameters<typeof Notification>) {
    super(...args)

    this._timestamp = new Date().getTime()
  }

  public override get timestamp() {
    return this._timestamp
  }
}

export default ('Notification' in globalThis && !('timestamp' in Notification.prototype))
  ? TimestampableNotification
  : undefined
