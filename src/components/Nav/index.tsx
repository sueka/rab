import React from 'react'
import { FormattedMessage } from 'react-intl'

import List from '@material-ui/core/List'

import ListItemLink from '~/components/ListItemLink'
import LocaleSelect from '~/containers/LocaleSelect'

import messages from './messages'

const Nav: React.FunctionComponent = () => (
  <>
    <LocaleSelect />
    <List component="nav">
      <ListItemLink to="/"><FormattedMessage { ...messages.home } /></ListItemLink>
      <ListItemLink to="/counter"><FormattedMessage { ...messages.counter } /></ListItemLink>
      <ListItemLink to="/info"><FormattedMessage { ...messages.info } /></ListItemLink>
      <ListItemLink to="/reminder"><FormattedMessage { ...messages.reminder } /></ListItemLink>
    </List>
  </>
)

export default Nav
