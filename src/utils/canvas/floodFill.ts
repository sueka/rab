import { shouldBePresent } from '~/asserters/commonAsserters'
import delay from '~/delay'
import Color from '~/domain/vo/Color'

export /* for testing */ function getColor({ x, y }: Canvas.Point, context: CanvasRenderingContext2D): Color {
  const { data: [red, green, blue, alpha] } = context.getImageData(x, y, 1, 1)

  return new Color({
    red,
    green,
    blue,
    alpha,
  })
}

export default async function floodFill(targetPoint: Canvas.Point, width: number, height: number, context: CanvasRenderingContext2D) {
  shouldBePresent(context)

  const queue: Canvas.Point[] = [] // TODO
  const targetColor = getColor(targetPoint, context)

  // tslint:disable-next-line:no-array-mutation
  queue.push(targetPoint)

  // tslint:disable-next-line:no-loop-statement
  while (queue.length !== 0) {
    const currentPoint = queue.shift() // tslint:disable-line:no-array-mutation

    shouldBePresent(currentPoint)

    const currentColor = getColor(currentPoint, context)

    if (!targetColor.equals(currentColor)) {
      continue
    }

    context.fillRect(currentPoint.x, currentPoint.y, 1, 1)

    if (currentPoint.x > 0) {
      // tslint:disable-next-line:no-array-mutation
      queue.push({ x: currentPoint.x - 1, y: currentPoint.y })
    }

    if (currentPoint.y > 0) {
      // tslint:disable-next-line:no-array-mutation
      queue.push({ x: currentPoint.x, y: currentPoint.y - 1 })
    }

    if (currentPoint.x < width - 1) {
      // tslint:disable-next-line:no-array-mutation
      queue.push({ x: currentPoint.x + 1, y: currentPoint.y })
    }

    if (currentPoint.y < height - 1) {
      // tslint:disable-next-line:no-array-mutation
      queue.push({ x: currentPoint.x, y: currentPoint.y + 1 })
    }

    await delay(30)
  }
}
