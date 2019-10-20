import React from 'react'
import { FormattedMessage } from 'react-intl'

import Link from '~/components/Link'
import LocaleSelect from '~/containers/LocaleSelect'

import messages from './messages'

const Nav: React.FunctionComponent = () => (
  <>
    <LocaleSelect />
    <Link to="/counter"><FormattedMessage { ...messages.counter } /></Link>
    <Link to="/info"><FormattedMessage { ...messages.info } /></Link>
    <Link to="/reminder"><FormattedMessage { ...messages.reminder } /></Link>
  </>
)

export default Nav
