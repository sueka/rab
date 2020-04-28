import { toQueryMap } from './fetch'

describe('toQueryMap', () => {
  it('works', () => {
    expect(toQueryMap({})).toMatchObject({})
    expect(toQueryMap({ foo: '2' })).toMatchObject({ foo: '2' })
    expect(toQueryMap({ foo: ['2', '4'] })).toMatchObject({ ['foo[0]']: '2', ['foo[1]']: '4' })
    expect(toQueryMap({ foo: [['2']] })).toMatchObject({ ['foo[0][0]']: '2' })
    expect(toQueryMap({ foo: { bar: '6', baz: '10' } })).toMatchObject({ ['foo[bar]']: '6', ['foo[baz]']: '10' })
    expect(toQueryMap({ foo: { bar: { baz: '30', qux: '42' } } })).toMatchObject({ ['foo[bar][baz]']: '30', ['foo[bar][qux]']: '42' })
    expect(toQueryMap({ foo: { bar: { baz: ['30', '900'] } } })).toMatchObject({ ['foo[bar][baz][0]']: '30', ['foo[bar][baz][1]']: '900' })
  })
})
