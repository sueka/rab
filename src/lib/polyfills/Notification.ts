// NOTE: undefined を継承すると super に失敗するため、 class {} にフォールバックする。 globalThis.Notification を polyfill すると globalThis.Notification の有無を判定できなくなる。
export default class Notification
  extends (globalThis.Notification ?? class {}) // tslint:disable-line:max-classes-per-file
{
  private _timestamp: number

  constructor(...args: ConstructorParameters<typeof globalThis.Notification>) {
    super(...args)

    this._timestamp = new Date().getTime()
  }

  public get timestamp() {
    return this._timestamp
  }
}
