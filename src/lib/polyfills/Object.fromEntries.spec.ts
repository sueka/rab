import fromEntries from './Object.fromEntries'

describe('Object.fromEntries', () => {
  it('should undo applying Object.entries for a record', () => {
    expect(fromEntries(Object.entries({}))).toEqual({})
    expect(fromEntries(Object.entries({ a: 0 }))).toEqual({ a: 0 })
    expect(fromEntries(Object.entries({ b: { c: 7 } }))).toEqual({ b: { c: 7 } })
  })

  it('should work with a Map object', () => {
    expect(fromEntries(new Map([['a', 0], ['b', 1]]))).toEqual({ a: 0, b: 1 })
  })

  it('should work with a circularly referenced object ', () => {
    const object: Record<Index, unknown> = { a: 0 }

    object.self = object // tslint:disable-line:no-object-mutation

    expect(fromEntries(Object.entries(object))).toEqual(object)
  })
})
