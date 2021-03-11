import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import React, { useCallback, useState } from 'react'
import Helmet from 'react-helmet'
import { FormattedMessage, FormattedNumber, useIntl } from 'react-intl'

import CurrentTimeOfDay from '~/components/CurrentTimeOfDay'
import SetClockButton from '~/components/SetClockButton'
import Today from '~/components/Today'
import CopiableTextField from '~/lib/components/CopiableTextField'
import useScreenSize from '~/lib/hooks/useScreenSize'
import { createPage } from '~/templates/PageTemplate'
import messages from './messages'

const HomePage: React.FC = () => {
  const { formatMessage } = useIntl()
  const [text, setText] = useState('')

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    setText(event.target.value)
  }, [])

  const { requestPermission } = useScreenSize()

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
      <CopiableTextField value={ text } onChange={ handleChange } />
      <Button onClick={ requestPermission }>
        <FormattedMessage { ...messages.requestPermissionToUseDeviceorientation } />
      </Button>
    </>
  )
}

export default createPage(HomePage)
