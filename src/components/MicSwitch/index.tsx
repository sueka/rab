import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox'
import Tooltip from '@material-ui/core/Tooltip'
import MicIcon from '@material-ui/icons/Mic'
import MicNoneIcon from '@material-ui/icons/MicNone'
import { useSnackbar } from 'notistack'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useSelector } from 'react-redux'

import { State } from '~/redux'
import messages from './messages'

export interface Props {
  inputFor: React.RefObject<HTMLInputElement>
  fallback?: React.ReactElement | null
  onResult(event: SpeechRecognitionEvent, value: string): void
}

const MicSwitch: React.FC<Props> = ({ inputFor: input, onResult, fallback }) => {
  const { formatMessage } = useIntl()
  const locale = useSelector((state: State) => state.localeSelector.locale)
  const [listening, setListening] = useState(false)
  const recognition = useMemo(() => 'SpeechRecognition' in globalThis ? new SpeechRecognition() : null, [])
  const tooltip = useMemo(() => listening ? formatMessage(messages.stop) : formatMessage(messages.typeWithYourVoice), [listening, formatMessage])
  const { enqueueSnackbar } = useSnackbar()

  const handleRecognitionStart = useCallback<NonNullable<SpeechRecognition['onstart']>>(() => {
    setListening(true)
  }, [])

  const handleRecognitionEnd = useCallback<NonNullable<SpeechRecognition['onend']>>(() => {
    setListening(false)
  }, [])

  const handleRecognitionError = useCallback<NonNullable<SpeechRecognition['onerror']>>((event) => {
    enqueueSnackbar(<FormattedMessage { ...messages.speechRecognitionErrorOccurred } values={ { error: event.error } } />, {
      variant: 'error',
    })

    // TODO: recognition が終了しない致命的なエラーがあれば、 recognition.abort() する。
  }, [enqueueSnackbar])

  const handleRecognitionResult = useCallback<NonNullable<SpeechRecognition['onresult']>>((event) => {
    onResult(event, Array.from(event.results).map(result => result[0].transcript).join('')) // TODO: result.isFinal な result をメモしてパフォーマンスを改善させる。
  }, [onResult])

  useEffect(() => () => {
    recognition?.stop()
  }, [recognition])

  useEffect(() => {
    if (recognition === null) {
      return
    }

    /* tslint:disable:no-object-mutation */
    recognition.continuous = true
    recognition.interimResults = true
    recognition.maxAlternatives = 1
    /* tslint:enable:no-object-mutation */

    recognition.addEventListener('start', handleRecognitionStart)
    recognition.addEventListener('end', handleRecognitionEnd)
    recognition.addEventListener('error', handleRecognitionError)
    recognition.addEventListener('result', handleRecognitionResult)

    return () => {
      recognition.removeEventListener('start', handleRecognitionStart)
      recognition.removeEventListener('end', handleRecognitionEnd)
      recognition.removeEventListener('error', handleRecognitionError)
      recognition.removeEventListener('result', handleRecognitionResult)
    }
  }, [recognition, handleRecognitionStart, handleRecognitionEnd, handleRecognitionError, handleRecognitionResult])

  // NOTE: locale は recognition やイベントハンドラーと比べると変わりやすい。
  useEffect(() => {
    if (recognition === null) {
      return
    }

    recognition.stop() // NOTE: recognition の言語を途中で変更することはできないので、 locale が変更されたら停止する。

    recognition.lang = locale // tslint:disable-line:no-object-mutation
  }, [recognition, locale])

  const handleMicChange = useCallback<NonNullable<CheckboxProps['onChange']>>((_event, checked) => {
    if (recognition === null) {
      return
    }

    setListening(checked) // NOTE: onrecognitionstart/onrecognitionend でも同じことを行うが、一般に onChange で value を変更しないと状態がおかしくなることがある。

    if (checked) {
      recognition.start()
    } else {
      recognition.stop()
    }
  }, [recognition])

  // NOTE: input が render された後の input.current が必要なので、 useMemo ではなく useState + useEffect を使う。
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    // NOTE: `input.current === null` のときに not disabled だと、レンダリングの途中でクリックすることで、本来は disabled な <input> で onChange が発生させることができる。
    setDisabled(input.current === null || input.current.disabled)
  })

  useEffect(() => {
    if (recognition === null) {
      return
    }

    if (disabled) {
      recognition.abort()
    }
  }, [disabled, recognition])

  if (recognition === null && fallback !== undefined) {
    return fallback
  }

  return (
    <Tooltip
      title={ tooltip }
      disableFocusListener={ disabled }
      disableHoverListener={ disabled }
      disableTouchListener={ disabled }
    >
      <span>
        <Checkbox
          disabled={ disabled }
          color="default"
          icon={ <MicNoneIcon /> }
          checkedIcon={ <MicIcon /> }
          checked={ listening }
          onChange={ handleMicChange }
        />
      </span>
    </Tooltip>
  )
}

export default MicSwitch
