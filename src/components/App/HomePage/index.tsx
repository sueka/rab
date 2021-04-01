import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import React, { useCallback, useRef, useState } from 'react'
import Helmet from 'react-helmet'
import { FormattedNumber, useIntl } from 'react-intl'

import CurrentTimeOfDay from '~/components/CurrentTimeOfDay'
import NotifyMeButton from '~/components/NotifyMeButton'
import { createPage } from '~/components/PageTemplate'
import SetClockButton from '~/components/SetClockButton'
import Today from '~/components/Today'
import messages from './messages'

const HomePage: React.FC = () => {
  const { formatMessage } = useIntl()
  const input = useRef<HTMLInputElement>(null)
  const [text, setText] = useState('')

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    setText(event.target.value)
  }, [])

  return (
    <>
      <Helmet title={ formatMessage(messages.home) } />
      <Typography>
        <FormattedNumber format="usd" value={ 100 } />
      </Typography>
      <Typography>
        <Today /> <CurrentTimeOfDay />
      </Typography>
      <SetClockButton />
      <TextField
        ref={ input }
        value={ text }
        onChange={ handleChange }
        InputProps={ {
          endAdornment: (
            <InputAdornment position="end">
              <NotifyMeButton inputFor={ input } />
            </InputAdornment>
          ),
        } }
      />
    </>
  )
}

export default createPage(HomePage)
