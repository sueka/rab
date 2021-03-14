import Typography from '@material-ui/core/Typography'
import React, { useCallback, useState } from 'react'
import Helmet from 'react-helmet'
import { FormattedNumber, useIntl } from 'react-intl'

import CurrentTimeOfDay from '~/components/CurrentTimeOfDay'
import { createPage } from '~/components/PageTemplate'
import SetClockButton from '~/components/SetClockButton'
import Today from '~/components/Today'
import CopiableTextField from '~/lib/components/CopiableTextField'
import messages from './messages'

const HomePage: React.FC = () => {
  const { formatMessage } = useIntl()
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
      <CopiableTextField value={ text } onChange={ handleChange } />
    </>
  )
}

export default createPage(HomePage)
