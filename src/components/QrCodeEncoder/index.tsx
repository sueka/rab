import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectProps } from '@mui/material/Select'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import QRCode, { QRCodeErrorCorrectionLevel, QRCodeMaskPattern } from 'qrcode'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { v4 } from 'uuid'

import { shouldBePresent } from '~/asserters/commonAsserters'
import { isOneOf } from '~/guards/commonGuards'
import messages from './messages'

type QrCodeEncoderProps = Pick<TextFieldProps, 'defaultValue'>

const errorCorrectionLevels: QRCodeErrorCorrectionLevel[] = ['L', 'M', 'Q', 'H']
const maskPatterns: QRCodeMaskPattern[] = [0, 1, 2, 3, 4, 5, 6, 7]

// TODO: Follow Material Design
const QrCodeEncoder: React.FC<QrCodeEncoderProps> = ({ ...textFieldProps }) => {
  const input = useRef<HTMLInputElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const errorCorrectionLevelSelectId = useMemo(v4, [])
  const maskPatternSelectId = useMemo(v4, [])
  const inputLabel = useRef<HTMLLabelElement>(null)
  const { formatMessage } = useIntl()

  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState<QRCodeErrorCorrectionLevel>('M') //
  const [maskPattern, setMaskPattern] = useState<QRCodeMaskPattern | undefined>()

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    if (event.currentTarget.value !== '') {
      QRCode.toCanvas(canvas.current, event.currentTarget.value, {
        errorCorrectionLevel,
        maskPattern,
      })
    }
  }, [canvas, errorCorrectionLevel, maskPattern])

  const handleErrorCorrectionLevelChange = useCallback<NonNullable<SelectProps['onChange']>>((event) => {
    if (!isOneOf<(QRCodeErrorCorrectionLevel)[]>(...errorCorrectionLevels)(event.target.value)) {
      throw new Error //
    }

    const errorCorrectionLevel = event.target.value

    setErrorCorrectionLevel(errorCorrectionLevel)

    shouldBePresent(input.current?.value)

    QRCode.toCanvas(canvas.current, input.current?.value, {
      errorCorrectionLevel,
      maskPattern,
    })
  }, [maskPattern])

  const handleMaskPatternChange = useCallback<NonNullable<SelectProps['onChange']>>((event) => {
    if (!isOneOf<(`${ QRCodeMaskPattern }` | 'default')[]>(...maskPatterns.map<`${ QRCodeMaskPattern }`>((n) => `${ n }`), 'default')(event.target.value)) {
      throw new Error //
    }

    const maskPattern = event.target.value !== 'default' ? Number(event.target.value) : undefined

    setMaskPattern(maskPattern)

    shouldBePresent(input.current?.value)

    QRCode.toCanvas(canvas.current, input.current?.value, {
      errorCorrectionLevel,
      maskPattern,
    })
  }, [errorCorrectionLevel])

  useEffect(() => {
    if (input.current?.value) {
      QRCode.toCanvas(canvas.current, input.current.value)
    }
  }, [input, canvas])

  return (
    <Grid container spacing={ 2 } direction="row">
      <Grid item xs={ 12 } sm={ 6 } container spacing={ 2 } alignContent="flex-start">
        <Grid item xs={ 12 }>
          <TextField fullWidth multiline inputRef={ input } onChange={ handleChange } { ...textFieldProps } />
        </Grid>
        <Grid item xs={ 6 }>
          <InputLabel ref={ inputLabel } htmlFor={ errorCorrectionLevelSelectId }>
            <FormattedMessage { ...messages.errorCorrectionLevel } />
          </InputLabel>
          <Select
            native
            onChange={ handleErrorCorrectionLevelChange }
            id={ errorCorrectionLevelSelectId }
            value={ errorCorrectionLevel }
          >
            { errorCorrectionLevels.map((level, i) =>
              <option key={ i } value={ level }>{ level }</option>
            ) }
          </Select>
        </Grid>
        <Grid item xs={ 6 }>
          <InputLabel ref={ inputLabel } htmlFor={ maskPatternSelectId }>
            <FormattedMessage { ...messages.maskPattern } />
          </InputLabel>
          <Select
            native
            onChange={ handleMaskPatternChange }
            id={ maskPatternSelectId }
            value={ maskPattern ?? 'default' }
          >
            <option value="default">{ formatMessage(messages.default) }</option>
            { maskPatterns.map((pattern, i) =>
              <option key={ i } value={ pattern }>{ pattern }</option>
            ) }
          </Select>
        </Grid>
      </Grid>
      <Grid item xs={ 12 } sm={ 6 }>
        <canvas ref={ canvas } />
      </Grid>
    </Grid>
  )
}

export default QrCodeEncoder
