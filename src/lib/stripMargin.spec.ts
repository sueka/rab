import stripMargin from './stripMargin'

describe('stripMargin', () => {
  it('should return', () => {
    expect(stripMargin('')).toEqual('')
    expect(stripMargin('a')).toEqual('a')
    expect(stripMargin('|a')).toEqual('a')
    expect(stripMargin('||a')).toEqual('|a')
    expect(stripMargin('| |a')).toEqual(' |a')
    expect(stripMargin(' | |a')).toEqual(' |a')
    expect(stripMargin(`
      |foo
      |bar
      |`)).toEqual('\nfoo\nbar\n')
    expect(stripMargin("\n      |foo\r\n      |bar\r      |")).toEqual('\nfoo\r\nbar\r      |')
    expect(stripMargin('/', `
      /foo
      /bar
      /`)).toEqual('\nfoo\nbar\n')
    expect(stripMargin('/', `
      |foo
      |bar
      |`)).toEqual('\n      |foo\n      |bar\n      |') // TODO
  })
})
