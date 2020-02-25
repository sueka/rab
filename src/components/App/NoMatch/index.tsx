import React from 'react'
import { RouteComponentProps } from 'react-router'

import typed from '~/lib/typed'
import { createPage } from '~/templates/PageTemplate'

type Props =
  & RouteComponentProps

const NoMatch: React.FunctionComponent<Props> = ({ location: { pathname } }) => {
  throw new Error(typed<[string]>`No route matches ${ pathname }.`)
}

export default createPage(NoMatch)
