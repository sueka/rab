import React from 'react'
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom'
import { Omit } from 'react-redux'

import MuiLink, { LinkProps as MuiLinkProps } from '@material-ui/core/Link'

import typed from '~/lib/typed'
import { optional, isOneOf } from '~/lib/guards/commonGuards'

export type Props =
  & RouterLinkProps
  & Omit<MuiLinkProps, 'color' | 'ref'>

const isTypographyColor = optional(isOneOf('initial', 'inherit', 'primary', 'secondary', 'textPrimary', 'textSecondary', 'error'))

// TODO: delete this; See also https://material-ui.com/guides/composition/#link
const RouterLinkWithRef = React.forwardRef<HTMLAnchorElement, RouterLinkProps>((props, ref) => (
  <RouterLink innerRef={ ref } { ...props } />
))

export default class Link extends React.Component<Props> {
  public render() {
    const { color, ...restProps } = this.props

    if (!isTypographyColor(color)) {
      console.warn(typed<[string]>`${ color } is not a Material-UI Typography color.`) // tslint:disable-line:no-console

      return (
        <MuiLink component={ RouterLinkWithRef } { ...restProps } />
      )
    }

    return (
      <MuiLink component={ RouterLinkWithRef } color={ color } { ...restProps } />
    )
  }
}
