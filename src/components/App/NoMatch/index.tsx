import React from 'react'
import { RouteComponentProps } from 'react-router'

import typed from '~/lib/typed'

type Props =
  & RouteComponentProps

const NoMatch: React.FunctionComponent<Props> = ({ location: { pathname } }) => {
  throw new Error(typed<[string]>`No route matches ${ pathname }.`)
}

export default NoMatch
