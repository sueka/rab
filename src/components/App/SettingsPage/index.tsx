import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import React from 'react'
import Helmet from 'react-helmet'
import { FormattedMessage, useIntl } from 'react-intl'

import DarkSwitch from '~/components/DarkSwitch'
import { createPage } from '~/templates/PageTemplate'
import messages from './messages'

const SettingsPage: React.FC = () => {
  const { formatMessage } = useIntl()

  return (
    <>
      <Helmet title={ formatMessage(messages.settings) } />
      <Grid sm={ 6 } md={ 4 } lg={ 3 } xl={ 2 }>
        <List>
          <ListItem>
            <ListItemText primary={ <FormattedMessage { ...messages.darkTheme } /> } />
            <ListItemSecondaryAction>
              <DarkSwitch />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Grid>
    </>
  )
}

export default createPage(SettingsPage)
