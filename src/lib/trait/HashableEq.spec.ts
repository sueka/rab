import HashableEq from './HashableEq'

class Point extends HashableEq {
  constructor(
    public x: number,
    public y: number,
  ) {
    super()
  }

  hashCode() {
    return [this.x, this.y].hashCode()
  }
}

class ColoredPoint extends Point {
  constructor(
    public x: number,
    public y: number,
    public color: Color,
  ) {
    super(x, y)
  }

  hashCode() {
    return [this.x, this.y, this.color].hashCode()
  }
}

class SmellPoint extends Point {}

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
      const cp = new ColoredPoint(1, 2, 'red')

      expect(!p.equals(cp) || cp.equals(p)).toBeTruthy()
      expect(!cp.equals(p) || p.equals(cp)).toBeTruthy()
    })

    it('should be transitive', () => {
      const redP = new ColoredPoint(1, 2, 'red')
      const p = new Point(1, 2)
      const blueP = new ColoredPoint(1, 2, 'blue')

      expect(!(redP.equals(p) && p.equals(blueP)) || redP.equals(blueP)).toBeTruthy()
    })

    it('should finish comparing instances of classes different from each other that have their common ancestor class', (done) => {
      const cp = new ColoredPoint(1, 2, 'red')
      const sp = new SmellPoint(1, 2)

      cp.equals(sp)

      done()
    })
  })
})
