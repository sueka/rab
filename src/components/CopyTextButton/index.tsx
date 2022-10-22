import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import FilterNoneIcon from '@material-ui/icons/FilterNone'
import copy from 'copy-to-clipboard'
import { useSnackbar } from 'notistack'
import React, { useCallback, useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { shouldBePresent } from '~/asserters/commonAsserters'
import messages from './messages'

interface Props {
  inputFor: React.RefObject<HTMLInputElement | HTMLTextAreaElement>
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

  // NOTE: input が render された後の input.current が必要なので、 useMemo ではなく useState + useEffect を使う。
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    setDisabled(input.current === null || input.current.value === '' || input.current.disabled)
  }, [input, setDisabled])

  return (
    <Tooltip
      title={ formatMessage(messages.copyText) }
      disableFocusListener={ disabled }
      disableHoverListener={ disabled }
      disableTouchListener={ disabled }
    >
      <span>
        <IconButton onClick={ handleClick } disabled={ disabled }>
          <ContentCopyIcon />
        </IconButton>
      </span>
    </Tooltip>
  )
}

export default CopyTextButton
