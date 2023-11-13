import { IconButton, InputAdornment, TextField } from '@material-ui/core'
import { Send as SendIcon } from '@material-ui/icons'
import { useInjection } from 'inversify-react'
import React, { useCallback, useMemo, useState } from 'react'
import Helmet from 'react-helmet'
import { useIntl } from 'react-intl'

import { createPage } from '~/components/PageTemplate'
import ConfigRegistry from '~/config/ConfigRegistry'
import messages from './messages'

const ChatPage: React.FC = () => {
  const { formatMessage } = useIntl()
  const [message, setMessage] = useState('')
  const config = useInjection<ConfigRegistry>('EnvVarConfig')
  const ws = useMemo(() => new WebSocket(config.get('CHAT_SERVER_URL')), [config])

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    setMessage(event.target.value)
  }, [])

  const handleSendButtonClick = useCallback<React.MouseEventHandler>((_event) => {
    ws.send(message)
  }, [ws, message])

  return (
    <>
      <Helmet title={ formatMessage(messages.chat) } />
      <TextField
        value={ message }
        onChange={ handleChange }
        InputProps={ {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={ handleSendButtonClick }>
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
