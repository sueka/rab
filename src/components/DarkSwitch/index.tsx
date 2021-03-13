import Grid from '@material-ui/core/Grid'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'
import React, { useCallback, useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import ThemeProviderContext from '~/contexts/ThemeProviderContext'
import classes from './classes.css'
import messages from './messages'

const DarkSwitch = () => {
  const { dark, setDark } = useContext(ThemeProviderContext)

  if (dark == null || setDark == null) {
    throw new Error //
  }

  const handleChange = useCallback((_event, checked) => {
    setDark(checked)
  }, [setDark])

  return (
    <Grid
      container
      alignItems="center"
      component="label"
      classes={ {
        root: classes.DarkSwitch,
        container: classes.DarkSwitchContainer,
      } }
    >
      <Grid item>
        <Typography component="span">
          <FormattedMessage { ...messages.light } />
        </Typography>
      </Grid>
      <Grid item>
        <Switch checked={ dark } onChange={ handleChange } />
      </Grid>
      <Grid item>
        <Typography component="span">
          <FormattedMessage { ...messages.dark } />
        </Typography>
      </Grid>
    </Grid>
  )
}

export default DarkSwitch
