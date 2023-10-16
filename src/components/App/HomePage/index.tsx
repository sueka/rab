import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useInjection } from 'inversify-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Helmet from 'react-helmet'
import { FormattedNumber, useIntl } from 'react-intl'

import CurrentTimeOfDay from '~/components/CurrentTimeOfDay'
import NotifyMeButton from '~/components/NotifyMeButton'
import ObtainCookieConsentButton from '~/components/ObtainCookieConsentButton'
import { createPage } from '~/components/PageTemplate'
import SetClockButton from '~/components/SetClockButton'
import Today from '~/components/Today'
import ConfigRegistry from '~/config/ConfigRegistry'
import messages from './messages'

const crateImport = import('~/crate/pkg')

const HomePage: React.FC = () => {
  const config = useInjection<ConfigRegistry>('EnvVarConfig')
  const gtmContainerId = config.get('GTM_CONTAINER_ID')
  const { formatMessage } = useIntl()
  const input = useRef<HTMLInputElement>(null)
  const [text, setText] = useState('')

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    setText(event.target.value)
  }, [])

  useEffect(() => {
    ;(async () => {
      const { add } = await crateImport

      console.log(add(1, 1))
    })()
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
        variant="standard"
        value={ text }
        onChange={ handleChange }
        InputProps={ {
          endAdornment: (
            <InputAdornment position="end">
              <NotifyMeButton inputFor={ input } />
            </InputAdornment>
          ),
        } }
        inputProps= { {
          ref: input,
        } }
      />
      { gtmContainerId !== undefined && <ObtainCookieConsentButton /> }
    </>
  )
}

export default createPage(HomePage)
