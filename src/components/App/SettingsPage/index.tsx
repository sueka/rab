import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Switch from '@material-ui/core/Switch'
import React, { useCallback, useContext } from 'react'
import Helmet from 'react-helmet'
import { FormattedMessage, useIntl } from 'react-intl'

import { createPage } from '~/components/PageTemplate'
import ThemeProviderContext from '~/contexts/ThemeProviderContext'
import messages from './messages'

const SettingsPage: React.FC = () => {
  const { formatMessage } = useIntl()

  const { dark, setDark } = useContext(ThemeProviderContext)

  if (dark == null || setDark == null) {
    throw new Error //
  }

  const handleChange = useCallback((_event, checked) => {
    setDark(checked)
  }, [setDark])

  return (
    <>
      <Helmet title={ formatMessage(messages.settings) } />
      <Grid sm={ 6 } md={ 4 } lg={ 3 } xl={ 2 }>
        <List>
          <ListItem>
            <ListItemText primary={ <FormattedMessage { ...messages.darkTheme } /> } />
            <ListItemSecondaryAction>
              <Switch checked={ dark } onChange={ handleChange } />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Grid>
    </>
  )
}

export default createPage(SettingsPage)
