import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import FilterNoneIcon from '@material-ui/icons/FilterNone'
import copy from 'copy-to-clipboard'
import { useSnackbar } from 'notistack'
import React, { useCallback, useMemo } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { shouldBePresent } from '~/lib/asserters/commonAsserters'
import messages from './messages'

interface Props {
  inputFor: React.RefObject<HTMLInputElement>
}

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

const CopyTextButton: React.FC<Props> = ({ inputFor: input }) => {
  const { formatMessage } = useIntl()
  const { enqueueSnackbar } = useSnackbar()

  const handleClick = useCallback(() => {
    shouldBePresent(input.current)

    if (input.current.value === '') {
      return
    }

    copy(input.current.value) // TODO: await navigator.clipboard.writeText(input.current.value)

    enqueueSnackbar(
      <FormattedMessage { ...messages.textCopied } />
    )
  }, [enqueueSnackbar, input])

  const disabled = useMemo(() => input.current === null || input.current.value === '', [
    input,
    input.current,
    input.current?.value,
  ])

  if (disabled) {
    return (
      <IconButton onClick={ handleClick } disabled>
        <ContentCopyIcon />
      </IconButton>
    )
  }

  return (
    <Tooltip title={ formatMessage(messages.copyText) }>
      <IconButton onClick={ handleClick }>
        <ContentCopyIcon />
      </IconButton>
    </Tooltip>
  )
}

export default CopyTextButton
