import zipIterators from './zipIterators'

describe('zipIterators', () => {
  const foos = ['foo', 'bar', 'baz', 'qux', 'quux', 'corge', 'grault', 'garply', 'waldo', 'fred', 'plugh', 'xyzzy', 'thud'].values()

  it('should terminate with an infinite iterator', () => {
    function* genXs() {
      let i = 1 // tslint:disable-line:no-let

      while (true) { // tslint:disable-line:no-loop-statement
        yield i++
      }
    }

    const xs = genXs()

    const xFooPairs = zipIterators(xs, foos)

    expect(xFooPairs.next().value).toEqual([1, 'foo'])
    expect(xFooPairs.next().value).toEqual([2, 'bar'])
    expect(xFooPairs.next().value).toEqual([3, 'baz'])
    expect(xFooPairs.next().value).toEqual([4, 'qux'])
    expect(xFooPairs.next().value).toEqual([5, 'quux'])
    expect(xFooPairs.next().value).toEqual([6, 'corge'])
    expect(xFooPairs.next().value).toEqual([7, 'grault'])
    expect(xFooPairs.next().value).toEqual([8, 'garply'])
    expect(xFooPairs.next().value).toEqual([9, 'waldo'])
    expect(xFooPairs.next().value).toEqual([10, 'fred'])
    expect(xFooPairs.next().value).toEqual([11, 'plugh'])
    expect(xFooPairs.next().value).toEqual([12, 'xyzzy'])
    expect(xFooPairs.next().value).toEqual([13, 'thud'])
    expect(xFooPairs.next().done).toBeTruthy()
  })
})
