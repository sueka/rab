import { makeStyles } from '@material-ui/core'
import { Temporal } from  'proposal-temporal'
import React, { useEffect, useRef, useState } from 'react'

import { shouldBePresent } from '~/lib/asserters/commonAsserters'
import zipWithIndexIterable from '~/lib/extensions/Iterable/zipWithIndexIterable'
import useScreen from '~/lib/hooks/useScreen'
import typed from '~/lib/typed'

interface StoppedClockProps {
  time: Temporal.TimeLike
}

// TODO: remove
function drawClockFace(radius: number, context: CanvasRenderingContext2D) {
  // face
  context.beginPath()
  context.arc(0, 0, 0.95 * radius, 0, 2 * Math.PI)
  context.fillStyle = 'white' // tslint:disable-line:no-object-mutation
  context.fill()

  // frame
  const gradient = context.createRadialGradient(0, 0, 0.9 * radius, 0, 0, radius)

  gradient.addColorStop(0, 'dimgray')
  gradient.addColorStop(0.5, 'white')
  gradient.addColorStop(1, 'dimgray')

  // context.beginPath()
  // context.arc(0, 0, 0.95 * radius, 0, 2 * Math.PI)
  context.lineWidth = 0.1 * radius // tslint:disable-line:no-object-mutation
  context.strokeStyle = gradient // tslint:disable-line:no-object-mutation
  context.stroke()

  // indices
  const INDICES = ['XII', 'I', 'II', 'III', 'IIII', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI']

  context.fillStyle = 'black' // tslint:disable-line:no-object-mutation
  context.font = typed<[number]>`${ 0.105 * radius }pt serif` // tslint:disable-line:no-object-mutation
  context.textAlign = 'center' // tslint:disable-line:no-object-mutation
  context.textBaseline = 'middle' // tslint:disable-line:no-object-mutation

  // tslint:disable-next-line:no-loop-statement
  for (const [INDEX, i] of zipWithIndexIterable(INDICES)) {
    // 12時の方向が0、時計回り。
    const angle = i / 6 * Math.PI

    context.rotate(angle)
    context.fillText(INDEX, 0, -0.8 * radius)
    context.rotate(-angle)
  }
}

// TODO: remove
function drawClockHands(time: Temporal.TimeLike, radius: number, context: CanvasRenderingContext2D) {
  drawHourHand(time, radius, context)
  drawMinuteHand(time, radius, context)
  drawSecondHand(time, radius, context)

  // TODO: draw canvas cap nut
}

// TODO: remove
function drawHourHand(time: Temporal.TimeLike, radius: number, context: CanvasRenderingContext2D) {
  shouldBePresent(time.hour)
  shouldBePresent(time.minute)
  shouldBePresent(time.second)

  // 12時の方向が0、時計回り。
  const hourHandAngle = ((time.hour % 12) + (time.minute / 60) + (time.second / 3600)) / 6 * Math.PI

  context.lineCap = 'round' // tslint:disable-line:no-object-mutation
  context.lineWidth = 0.06 * radius // tslint:disable-line:no-object-mutation
  context.strokeStyle = 'black' // tslint:disable-line:no-object-mutation

  context.beginPath()
  context.moveTo(0, 0)
  context.rotate(hourHandAngle)
  context.lineTo(0, -0.6 * radius)
  context.rotate(-hourHandAngle)
  context.stroke()
}

// TODO: remove
function drawMinuteHand(time: Temporal.TimeLike, radius: number, context: CanvasRenderingContext2D) {
  shouldBePresent(time.minute)
  shouldBePresent(time.second)

  // 12時の方向が0、時計回り。
  const minuteHandAngle = (time.minute + (time.second / 60)) / 30 * Math.PI

  context.lineCap = 'round' // tslint:disable-line:no-object-mutation
  context.lineWidth = 0.04 * radius // tslint:disable-line:no-object-mutation
  context.strokeStyle = 'black' // tslint:disable-line:no-object-mutation

  context.beginPath()
  context.moveTo(0, 0)
  context.rotate(minuteHandAngle)
  context.lineTo(0, -0.75 * radius)
  context.rotate(-minuteHandAngle)
  context.stroke()
}

// TODO: remove
function drawSecondHand(time: Temporal.TimeLike, radius: number, context: CanvasRenderingContext2D) {
  shouldBePresent(time.second)

  // 12時の方向が0、時計回り。
  const secondHandAngle = time.second / 30 * Math.PI

  context.lineCap = 'round' // tslint:disable-line:no-object-mutation
  context.lineWidth = 0.01 * radius // tslint:disable-line:no-object-mutation
  context.strokeStyle = 'red' // tslint:disable-line:no-object-mutation

  context.beginPath()
  context.moveTo(0, 0)
  context.rotate(secondHandAngle)
  context.moveTo(0,  0.3 * radius)
  context.lineTo(0, -0.7 * radius)
  context.rotate(-secondHandAngle)
  context.stroke()
}

interface StyleProps {
  width: number
  height: number
}

const useStyles = makeStyles<never, StyleProps, 'Canvas'>({
  Canvas: ({ width, height }) => ({
    width,
    height,
  }),
})

const RADIUS = 200 // diameter = 2 radius - 2

const StoppedClock: React.FC<StoppedClockProps> = ({ time }) => {
  const [context, setContext] = useState<CanvasRenderingContext2D | null>()
  const { dpr } = useScreen()

  const canvas = useRef<HTMLCanvasElement>(null)

  const jssClasses = useStyles({
    width: 2 * RADIUS,
    height: 2 * RADIUS,
  })

  useEffect(() => {
    setContext(canvas.current?.getContext('2d'))
  }, [canvas])

  useEffect(() => {
    if (context == null || canvas.current === null || dpr === null) {
      return
    }

    /* tslint:disable:no-object-mutation */
    canvas.current.width = 2 * dpr * RADIUS
    canvas.current.height = 2 * dpr * RADIUS
    /* tslint:enable:no-object-mutation */

    // X 軸は右向き、 Y 軸は下向き、反転無し、原点は中央。
    context.setTransform(dpr, 0, 0, dpr, dpr * RADIUS, dpr * RADIUS)
  }, [context, canvas, dpr])

  useEffect(() => {
    if (context == null) {
      return
    }

    drawClockFace(RADIUS, context)
    drawClockHands(time, RADIUS, context)
    // TODO: draw cover
  }, [context, time])

  return (
    <canvas
      ref={ canvas }
      className={ jssClasses.Canvas }
      width={ 2 * RADIUS }
      height={ 2 * RADIUS }
    />
  )
}

export default StoppedClock
