import indexBg from '../pkg/index_bg.wasm' // tslint:disable-line:no-relative-imports

const indexBgMock: typeof indexBg = {
  add: jest.fn(),
  memory: WebAssembly.Memory.prototype, // TODO
}

module.exports = indexBgMock // tslint:disable-line:no-object-mutation
