import Grid from '@material-ui/core/Grid'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'
import QRCode from 'qrcode'
import React, { useCallback, useEffect, useRef } from 'react'

type QrCodeEncoderProps = Pick<TextFieldProps, 'defaultValue'>

const QrCodeEncoder: React.FC<QrCodeEncoderProps> = ({ ...textFieldProps }) => {
  const input = useRef<HTMLInputElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    if (event.currentTarget.value !== '') {
      QRCode.toCanvas(canvas.current, event.currentTarget.value)
    }
  }, [canvas])

  useEffect(() => {
    if (input.current?.value) {
      QRCode.toCanvas(canvas.current, input.current.value)
    }
  }, [input, canvas])

  return (
    <Grid container spacing={ 2 }>
      <Grid item xs={ 12 } sm={ 5 }>
        <TextField inputRef={ input } onChange={ handleChange } { ...textFieldProps } />
      </Grid>
      <Grid item xs={ 12 } sm={ 7 }>
        <canvas ref={ canvas } />
      </Grid>
    </Grid>
  )
}

export default QrCodeEncoder
