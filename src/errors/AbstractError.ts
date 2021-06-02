export default abstract class AbstractError extends Error {
  constructor(public message = '') {
    super(message)

    this.name = new.target.name

    Object.setPrototypeOf(this, new.target.prototype)
  }
}
