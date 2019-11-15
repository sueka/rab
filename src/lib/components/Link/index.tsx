import React from 'react'
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom'

import MuiLink from '@material-ui/core/Link'
import { TypographyProps } from '@material-ui/core/Typography'

import typed from '~/lib/typed'

// TODO: move & test
function isTypographyColor(color: string | undefined): color is TypographyProps['color'] {
  return [
    'initial',
    'inherit',
    'primary',
    'secondary',
    'textPrimary',
    'textSecondary',
    'error',
    undefined,
  ].includes(color)
}

// TODO: delete this; See also https://material-ui.com/guides/composition/#link
const RouterLinkWithRef = React.forwardRef<HTMLAnchorElement, RouterLinkProps>((props, ref) => (
  <RouterLink innerRef={ ref } { ...props } />
))

export default class Link extends React.Component<RouterLinkProps> {
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
