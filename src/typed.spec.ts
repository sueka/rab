import typed from './typed'

describe('typed', () => {
  it('should work as well as template literal', () => {
    expect(typed`hello`).toEqual(`hello`)
    expect(typed<[number]>`1 + 2 = ${ 1 + 2 }`).toEqual(`1 + 2 = ${ 1 + 2 }`)
  })
})
