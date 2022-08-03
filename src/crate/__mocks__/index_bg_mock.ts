import indexBg from '../pkg/index_bg.wasm'

const indexBgMock: typeof indexBg = {
  add: jest.fn(),
  memory: WebAssembly.Memory.prototype, // TODO
}

module.exports = indexBgMock
