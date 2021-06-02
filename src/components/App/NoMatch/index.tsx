import React from 'react'
import { RouteComponentProps } from 'react-router'

import { createPage } from '~/components/PageTemplate'
import typed from '~/typed'

type Props =
  & RouteComponentProps

const NoMatch: React.FC<Props> = ({ location: { pathname } }) => {
  throw new Error(typed<[string]>`No route matches ${ pathname }.`)
}

export default createPage(NoMatch)
