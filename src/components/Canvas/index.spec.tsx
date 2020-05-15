import { getColor } from '.'

type JestCanvasMockUtilityName =
  | '__getEvents'
  | '__clearEvents'
  | '__getDrawCalls'
  | '__clearDrawCalls'
  | '__getPath'
  | '__clearPath'

describe('getColor', () => {
  it('should ', () => {
    const context = new CanvasRenderingContext2D as
      & Pick<CanvasRenderingContext2D, JestCanvasMockUtilityName>
      & jest.Mocked<Alt.Omit<CanvasRenderingContext2D, JestCanvasMockUtilityName>>

    context.getImageData.mockImplementationOnce((_sx, _sy, sw, sh) => ({
      data: new Uint8ClampedArray([30, 144, 255, 0]), // dodgerblue
      width: sw,
      height: sh,
    }))

    const color = getColor({ x: 0, y: 0 }, context)

    expect(context.getImageData).toBeCalledTimes(1)
    expect(context.getImageData).toBeCalledWith(expect.anything(), expect.anything(), 1, 1)
    expect(context.getImageData).toReturnWith(expect.objectContaining({ data: expect.any(Uint8ClampedArray) }))

    // TODO: test data size is four

    expect(color).toMatchObject({ red: 30, green: 144, blue: 255, alpha: 0 })
  })
})
