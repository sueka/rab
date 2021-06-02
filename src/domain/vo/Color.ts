import HashableEq from '~/trait/HashableEq'

// TODO: Remove
interface RgbaColor {
  red: number
  green: number
  blue: number
  alpha: number
}

export default interface Color extends RgbaColor {} // tslint:disable-line:no-empty-interface

export default class Color extends HashableEq implements Class.ValueObject<RgbaColor> {
  constructor({ red, green, blue, alpha }: RgbaColor) {
    super()

    this.red = red
    this.green = green
    this.blue = blue
    this.alpha = alpha
  }

  public hashCode() {
    // tslint:disable-next-line:no-let
    let result = 0

    result = 31 * result + this.red.hashCode()
    result = 31 * result + this.green.hashCode()
    result = 31 * result + this.blue.hashCode()
    result = 31 * result + this.alpha.hashCode()

    return result
  }
}
