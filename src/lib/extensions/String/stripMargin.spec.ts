import stripMargin from './stripMargin'

describe('stripMargin', () => {
  it('should strip whitespaces followed by marginChar (default to vertical bar) by line', () => {
    expect(stripMargin('')).toEqual('')
    expect(stripMargin('a')).toEqual('a')
    expect(stripMargin('|a')).toEqual('a')
    expect(stripMargin('||a')).toEqual('|a')
    expect(stripMargin('| |a')).toEqual(' |a')
    expect(stripMargin(' | |a')).toEqual(' |a')
    expect(stripMargin('\n      |foo\n      |bar\n      |')).toEqual('\nfoo\nbar\n')
    expect(stripMargin('\n      |foo\r\n      |bar\r      |')).toEqual('\nfoo\r\nbar\r      |')
    expect(stripMargin('/', '\n      /foo\n      /bar\n      /')).toEqual('\nfoo\nbar\n')
    expect(stripMargin('/', '\n      |foo\n      |bar\n      |')).toEqual('\n      |foo\n      |bar\n      |')
  })
})
