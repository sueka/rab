import * as React from 'react'
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom'

import MuiMenuItem, { MenuItemProps as MuiMenuItemProps } from '@material-ui/core/MenuItem'

type MenuItemLinkProps = MuiMenuItemProps<typeof RouterLink, { button?: true }>

// TODO: delete this; See also https://material-ui.com/guides/composition/#link
const RouterLinkWithRef = React.forwardRef<HTMLAnchorElement, RouterLinkProps>((props, ref) => (
  <RouterLink innerRef={ ref } { ...props } />
))

const MenuItemLink: React.FunctionComponent<MenuItemLinkProps> = ({ to, button, ref, ...props }) => (
  <MuiMenuItem button component={ RouterLinkWithRef } to={ to } { ...props } />
)

export default MenuItemLink
