import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import React, { useCallback, useContext, useRef, useState } from 'react'
import Helmet from 'react-helmet'
import { FormattedNumber, useIntl } from 'react-intl'

import CurrentTimeOfDay from '~/components/CurrentTimeOfDay'
import { createPage } from '~/components/PageTemplate'
import SetClockButton from '~/components/SetClockButton'
import Today from '~/components/Today'
import CopyTextButton from '~/lib/components/CopyTextButton'
import MicSwitch, { Props as MicSwitchProps } from '~/lib/components/MicSwitch'
import IntlProviderContext from '~/lib/contexts/IntlProviderContext'
import messages from './messages'

const HomePage: React.FC = () => {
  const { formatMessage } = useIntl()
  const [text, setText] = useState('')
  const copiableInput = useRef<HTMLInputElement>(null)
  const micIncludedInput = useRef<HTMLInputElement>(null)
  const { dir } = useContext(IntlProviderContext)

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    setText(event.target.value)
  }, [])

  const handleResult = useCallback<MicSwitchProps['onResult']>((_event, value) => {
    if (micIncludedInput.current === null) {
      return
    }

    setText(value)

    /* tslint:disable:no-object-mutation */
    micIncludedInput.current.scrollTop = micIncludedInput.current.scrollHeight - micIncludedInput.current.offsetHeight

    switch (dir) {
      case 'ltr':
        micIncludedInput.current.scrollLeft = micIncludedInput.current.scrollWidth - micIncludedInput.current.offsetWidth
        break
      case 'rtl':
        micIncludedInput.current.scrollLeft = -(micIncludedInput.current.scrollWidth - micIncludedInput.current.offsetWidth)
    }
    /* tslint:enable:no-object-mutation */
  }, [
    dir,
    micIncludedInput.current,
    // To handle resizing, DOM updates, etc:
    micIncludedInput.current?.scrollWidth,
    micIncludedInput.current?.scrollHeight,
    micIncludedInput.current?.offsetWidth,
    micIncludedInput.current?.offsetHeight,
])

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
        value={ text }
        onChange={ handleChange }
        inputRef={ copiableInput }
        InputProps={ {
          endAdornment: (
            <InputAdornment position="end">
              <CopyTextButton inputFor={ copiableInput } />
            </InputAdornment>
          ),
        } } />
      <TextField
        value={ text }
        onChange={ handleChange }
        inputRef={ micIncludedInput }
        InputProps={ {
          endAdornment: (
            <InputAdornment position="end">
              <MicSwitch
                onResult={ handleResult }
                fallback={ null }
              />
            </InputAdornment>
          ),
        } }
      />
    </>
  )
}

export default createPage(HomePage)
