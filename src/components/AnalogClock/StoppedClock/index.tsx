import React, { useEffect, useRef, useState } from 'react'
import { TimeLike } from  'temporal-polyfill'
import { makeStyles } from 'tss-react/mui'

import { shouldBePresent } from '~/asserters/commonAsserters'
import zipWithIndexIterable from '~/extensions/Iterable/zipWithIndexIterable'
import useScreen from '~/hooks/useScreen'
import typed from '~/typed'

interface Props {
  time: TimeLike
  radius?: number
}

// TODO: remove
function drawClockFace(radius: number, context: CanvasRenderingContext2D) {
  // face
  context.beginPath()
  context.arc(0, 0, 0.95 * radius, 0, 2 * Math.PI)
  context.fillStyle = 'white'
  context.fill()

  // frame
  const gradient = context.createRadialGradient(0, 0, 0.9 * radius, 0, 0, radius)

  gradient.addColorStop(0, 'dimgray')
  gradient.addColorStop(0.5, 'white')
  gradient.addColorStop(1, 'dimgray')

  // context.beginPath()
  // context.arc(0, 0, 0.95 * radius, 0, 2 * Math.PI)
  context.lineWidth = 0.1 * radius
  context.strokeStyle = gradient
  context.stroke()

  // indices
  const INDICES = ['XII', 'I', 'II', 'III', 'IIII', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI']

  context.fillStyle = 'black'
  context.font = typed<[number]>`${ 0.105 * radius }pt serif`
  context.textAlign = 'center'
  context.textBaseline = 'middle'


  for (const [INDEX, i] of zipWithIndexIterable(INDICES)) {
    // 12時の方向が0、時計回り。
    const angle = i / 6 * Math.PI

    context.rotate(angle)
    context.fillText(INDEX, 0, -0.8 * radius)
    context.rotate(-angle)
  }
}

// TODO: remove
function drawClockHands(time: TimeLike, radius: number, context: CanvasRenderingContext2D) {
  drawHourHand(time, radius, context)
  drawMinuteHand(time, radius, context)
  drawSecondHand(time, radius, context)

  // TODO: draw canvas cap nut
}

// TODO: remove
function drawHourHand(time: TimeLike, radius: number, context: CanvasRenderingContext2D) {
  shouldBePresent(time.hour)
  shouldBePresent(time.minute)
  shouldBePresent(time.second)

  // 12時の方向が0、時計回り。
  const hourHandAngle = ((time.hour % 12) + (time.minute / 60) + (time.second / 3600)) / 6 * Math.PI

  context.lineCap = 'round'
  context.lineWidth = 0.06 * radius
  context.strokeStyle = 'black'

  context.beginPath()
  context.moveTo(0, 0)
  context.rotate(hourHandAngle)
  context.lineTo(0, -0.6 * radius)
  context.rotate(-hourHandAngle)
  context.stroke()
}

// TODO: remove
function drawMinuteHand(time: TimeLike, radius: number, context: CanvasRenderingContext2D) {
  shouldBePresent(time.minute)
  shouldBePresent(time.second)

  // 12時の方向が0、時計回り。
  const minuteHandAngle = (time.minute + (time.second / 60)) / 30 * Math.PI

  context.lineCap = 'round'
  context.lineWidth = 0.04 * radius
  context.strokeStyle = 'black'

  context.beginPath()
  context.moveTo(0, 0)
  context.rotate(minuteHandAngle)
  context.lineTo(0, -0.75 * radius)
  context.rotate(-minuteHandAngle)
  context.stroke()
}

// TODO: remove
function drawSecondHand(time: TimeLike, radius: number, context: CanvasRenderingContext2D) {
  shouldBePresent(time.second)

  // 12時の方向が0、時計回り。
  const secondHandAngle = time.second / 30 * Math.PI

  context.lineCap = 'round'
  context.lineWidth = 0.01 * radius
  context.strokeStyle = 'red'

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

const useStyles = makeStyles<StyleProps>()<'Canvas'>((_theme, { width, height }) => ({
  Canvas: {
    width,
    height,
  },
}))

const StoppedClock: React.FC<Props> = ({
  time,
  radius = 200, // diameter = 2 radius - 2
}) => {
  const [context, setContext] = useState<CanvasRenderingContext2D | null>()
  const { dpr } = useScreen()

  const canvas = useRef<HTMLCanvasElement>(null)

  const { classes: jssClasses } = useStyles({
    width: 2 * radius,
    height: 2 * radius,
  })

  useEffect(() => {
    setContext(canvas.current?.getContext('2d'))
  }, [canvas])

  useEffect(() => {
    if (context == null || canvas.current === null || dpr === null) {
      return
    }

    canvas.current.width = 2 * dpr * radius
    canvas.current.height = 2 * dpr * radius

    // X 軸は右向き、 Y 軸は下向き、反転無し、原点は中央。
    context.resetTransform()
    context.scale(dpr, dpr)
    context.translate(radius, radius)
  }, [context, canvas, dpr, radius])

  useEffect(() => {
    if (context == null) {
      return
    }

    drawClockFace(radius, context)
    drawClockHands(time, radius, context)
    // TODO: draw cover
  }, [context, time, radius])

  return (
    <canvas
      ref={ canvas }
      className={ jssClasses.Canvas }
      width={ 2 * radius }
      height={ 2 * radius }
    />
  )
}

export default StoppedClock
