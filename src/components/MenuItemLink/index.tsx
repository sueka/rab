import * as React from 'react'
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom'

import MuiMenuItem, { MenuItemProps as MuiMenuItemProps } from '@material-ui/core/MenuItem'

type MenuItemLinkProps = MuiMenuItemProps<typeof RouterLink, { button?: true }>

const MenuItemLink: React.FunctionComponent<MenuItemLinkProps> = React.forwardRef<RouterLink, React.PropsWithoutRef<MenuItemLinkProps>>(({ to, button, innerRef, ...menuItemProps }, menuItem) => {
  // See https://material-ui.com/guides/composition/#link
  const RouterLinkWithRef = React.forwardRef<RouterLink, RouterLinkProps>((linkProps, link) => (
    <RouterLink ref={ link } innerRef={ innerRef } { ...linkProps } />
  ))

  return (
    <MuiMenuItem button component={ RouterLinkWithRef } to={ to } ref={ menuItem } { ...menuItemProps } />
  )
})

export default MenuItemLink
