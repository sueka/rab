import { IconButton, InputAdornment, TextField } from '@material-ui/core'
import { Send as SendIcon } from '@material-ui/icons'
import React, { useCallback, useState } from 'react'
import Helmet from 'react-helmet'
import { useIntl } from 'react-intl'

import { createPage } from '~/components/PageTemplate'
import messages from './messages'

const ChatPage: React.FC = () => {
  const { formatMessage } = useIntl()
  const [message, setMessage] = useState('')

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    setMessage(event.target.value)
  }, [])

  return (
    <>
      <Helmet title={ formatMessage(messages.chat) } />
      <TextField
        value={ message }
        onChange={ handleChange }
        InputProps={ {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton disabled>
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        } }
      />
    </>
  )
}

export default createPage(ChatPage)
