import HashableEq from './HashableEq'

class Point extends HashableEq {
  constructor(
    public x: number,
    public y: number
  ) {
    super()
  }

  public hashCode() {
    return [this.x, this.y].hashCode()
  }
}

// tslint:disable-next-line:max-classes-per-file
class SmellPoint extends Point {}

// tslint:disable-next-line:max-classes-per-file
class ColoredPoint extends Point {
  constructor(
    public x: number,
    public y: number,
    public color: Color
  ) {
    super(x, y)
  }

  public hashCode() {
    return [this.x, this.y, this.color].hashCode()
  }
}

type Color =
  | 'transparent'
  | 'black'
  | 'red'
  | 'blue'

describe('HashableEq', () => {
  describe('#equals', () => {
    it('should be reflexive', () => {
      const p = new Point(1, 2)
      const cp = new ColoredPoint(1, 2, 'red')

      expect(p.equals(p)).toBeTruthy()
      expect(cp.equals(cp)).toBeTruthy()
    })

    it('should be symmetric', () => {
      const p = new Point(1, 2)
      const sp = new SmellPoint(1, 2)
      const cp = new ColoredPoint(1, 2, 'red')

      expect(!p.equals(sp) || sp.equals(p)).toBeTruthy()
      expect(!sp.equals(p) || p.equals(sp)).toBeTruthy()
      expect(!p.equals(cp) || cp.equals(p)).toBeTruthy()
      expect(!cp.equals(p) || p.equals(cp)).toBeTruthy()
    })

    it('should be transitive', () => {
      const redP = new ColoredPoint(1, 2, 'red')
      const p = new Point(1, 2)
      const blueP = new ColoredPoint(1, 2, 'blue')

      expect(!(redP.equals(p) && p.equals(blueP)) || redP.equals(blueP)).toBeTruthy()
    })

    it('should meet the contract between equals and hashCode', () => {
      const p = new Point(1, 2)
      const cp = new ColoredPoint(1, 2, 'black')

      expect(!p.equals(cp) || p.hashCode() === cp.hashCode()).toBeTruthy()
    })

    it('should finish comparing instances of classes different from each other that have their common ancestor class', (done) => {
      const sp = new SmellPoint(1, 2)
      const cp = new ColoredPoint(1, 2, 'red')

      sp.equals(cp)

      done()
    })

    it('should return true if applied to instances of classes that have a common ancestor class and do not override canEqual, otherwise false', () => {
      const p = new Point(1, 2)
      const sp = new SmellPoint(1, 2)
      const cp = new ColoredPoint(1, 2, 'red')

      expect(p.equals(sp)).toBeTruthy()
      expect(sp.equals(cp)).toBeFalsy()
      expect(cp.equals(p)).toBeFalsy()
    })

    it('should consider that instances of ColoredPoints with different colors are not equal', () => {
      const redP = new ColoredPoint(1, 2, 'red')
      const blueP = new ColoredPoint(1, 2, 'blue')

      expect(redP.equals(blueP)).toBeFalsy()
      expect(blueP.equals(redP)).toBeFalsy()
    })
  })
})
