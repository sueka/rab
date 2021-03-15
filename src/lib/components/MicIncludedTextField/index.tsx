import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import MicIcon from '@material-ui/icons/Mic'
import MicNoneIcon from '@material-ui/icons/MicNone'
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import { useSelector } from 'react-redux'

import IntlProviderContext from '~/lib/contexts/IntlProviderContext'
import { State } from '~/redux'
import messages from './messages'

interface OwnProps {
  onResult(event: SpeechRecognitionEvent, value: string): void
  InputProps?: Alt.Omit<NonNullable<TextFieldProps['InputProps']>, 'endAdornment'>
}

// ref は通せるようにしてもよさそう
export type Props =
  & Alt.Omit<TextFieldProps, 'inputRef' | 'InputProps'>
  & OwnProps

const MicIncludedTextField: React.FC<Props> = ({ onResult, InputProps, ...restProps }) => {
  const { formatMessage } = useIntl()
  const input = useRef<HTMLInputElement>(null)
  const locale = useSelector((state: State) => state.localeSelector.locale)
  const [listening, setListening] = useState(false)
  const recognition = useMemo(() => new SpeechRecognition(), [])
  const tooltip = useMemo(() => listening ? formatMessage(messages.stop) : formatMessage(messages.typeWithYourVoice), [listening, formatMessage])
  const { dir } = useContext(IntlProviderContext)

  const handleRecognitionStart = useCallback<NonNullable<SpeechRecognition['onstart']>>(() => {
    setListening(true)
  }, [])

  const handleRecognitionEnd = useCallback<NonNullable<SpeechRecognition['onend']>>(() => {
    setListening(false)
  }, [])

  const handleRecognitionResult = useCallback<NonNullable<SpeechRecognition['onresult']>>((event) => {
    if (input.current === null || dir == null) {
      return
    }

    onResult(event, Array.from(event.results).map(result => result[0].transcript).join('')) // TODO: result.isFinal な result をメモしてパフォーマンスを改善させる。

    /* tslint:disable:no-object-mutation */
    input.current.scrollTop = input.current.scrollHeight - input.current.offsetHeight

    switch (dir) {
      case 'ltr':
        input.current.scrollLeft = input.current.scrollWidth - input.current.offsetWidth
        break
      case 'rtl':
        input.current.scrollLeft = -(input.current.scrollWidth - input.current.offsetWidth)
    }
    /* tslint:enable:no-object-mutation */
  }, [onResult, dir])

  useEffect(() => {
    /* tslint:disable:no-object-mutation */
    recognition.continuous = true
    recognition.interimResults = true
    recognition.maxAlternatives = 1
    /* tslint:enable:no-object-mutation */

    recognition.addEventListener('start', handleRecognitionStart)
    recognition.addEventListener('end', handleRecognitionEnd)
    recognition.addEventListener('result', handleRecognitionResult)

    return () => {
      recognition.removeEventListener('start', handleRecognitionStart)
      recognition.removeEventListener('end', handleRecognitionEnd)
      recognition.removeEventListener('result', handleRecognitionResult)
    }
  }, [recognition, handleRecognitionStart, handleRecognitionEnd, handleRecognitionResult])

  // NOTE: locale は recognition やイベントハンドラーと比べると変わりやすい。
  useEffect(() => {
    recognition.stop() // NOTE: recognition の言語を途中で変更することはできないので、 locale が変更されたら停止する。

    recognition.lang = locale // tslint:disable-line:no-object-mutation
  }, [recognition, locale])

  const handleMicChange = useCallback<NonNullable<CheckboxProps['onChange']>>((_event, checked) => {
    setListening(checked) // NOTE: recognitionstart/recognitionend でも同じことを行うが、 change で変更しないと状態がおかしくなることがある。

    if (checked) {
      recognition.start()
    } else {
      recognition.stop()
    }
  }, [recognition])

  return (
    <TextField
      inputRef={ input }
      InputProps={ {
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip title={ tooltip }>
              <Checkbox
                color="default"
                icon={ <MicNoneIcon /> }
                checkedIcon={ <MicIcon /> }
                checked={ listening }
                onChange={ handleMicChange }
              />
            </Tooltip>
          </InputAdornment>
        ),
        ...InputProps,
      } }
      { ...restProps }
    />
  )
}

export default MicIncludedTextField
