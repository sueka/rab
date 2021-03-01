import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import FilterNoneIcon from '@material-ui/icons/FilterNone'
import { useSnackbar } from 'notistack'
import React, { useCallback, useRef } from 'react'
import { useIntl } from 'react-intl'

import messages from './messages'

interface OwnProps {
  InputProps?: Alt.Omit<NonNullable<TextFieldProps['InputProps']>, 'endAdornment'>
}

// ref は通せるようにしてもよさそう
type Props =
  & Alt.Omit<TextFieldProps, 'inputRef' | 'InputProps'>
  & OwnProps

// TODO: @material-ui/icons/ContentCopy が実装されたら削除する
const ContentCopyIcon: React.FC<React.PropsOf<typeof FilterNoneIcon>> = ({ style, ...restProps }) => {
  if (style === undefined) {
    return <FilterNoneIcon style={ { transform: 'scaleY(-1)' } } { ...restProps } />
  }

  const { transform, ...restStyle } = style

  if (transform !== undefined) {
    throw new Error
  }

  return <FilterNoneIcon style={ { transform: 'scaleY(-1)', ...restStyle } } { ...restProps } />
}

const CopiableTextField: React.FC<Props> = ({ InputProps, ...restProps }) => {
  const { formatMessage } = useIntl()
  const { enqueueSnackbar } = useSnackbar()
  const input = useRef<HTMLInputElement>()

  // TODO: Support IE
  const handleClickCopyTextButton = useCallback(async () => {
    if (input.current?.value === undefined) {
      throw new Error
    }

    if (input.current.value === '') {
      return
    }

    await navigator.clipboard.writeText(input.current.value)

    enqueueSnackbar(formatMessage(messages.textCopied))
  }, [input, formatMessage, enqueueSnackbar])

  return (
    <TextField
      inputRef={ input }
      InputProps={ {
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip title={ formatMessage(messages.copyText) } >
              <IconButton onClick={ handleClickCopyTextButton }>
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          </InputAdornment>
        ),
        ...InputProps,
      } }
      { ...restProps }
    />
  )
}

export default CopiableTextField
