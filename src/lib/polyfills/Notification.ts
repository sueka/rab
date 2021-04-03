export default class Notification extends globalThis.Notification implements globalThis.Notification {
  private _timestamp: number

  constructor(...args: ConstructorParameters<typeof globalThis.Notification>) {
    super(...args)

    this._timestamp = new Date().getTime()
  }

  public get timestamp() {
    return this._timestamp
  }
}
