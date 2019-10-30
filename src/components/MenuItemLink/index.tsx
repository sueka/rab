import * as React from 'react'
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom'

import MuiMenuItem, { MenuItemProps as MuiMenuItemProps } from '@material-ui/core/MenuItem'

type MenuItemLinkProps = MuiMenuItemProps<typeof RouterLink, { button?: true }>

const MenuItemLink: React.FunctionComponent<MenuItemLinkProps> = React.forwardRef<RouterLink, React.PropsWithoutRef<MenuItemLinkProps>>(({ to, button, innerRef, ...props }, ref) => {
  // See https://material-ui.com/guides/composition/#link
  const RouterLinkWithRef = React.forwardRef<RouterLink, RouterLinkProps>((props, ref) => (
    <RouterLink ref={ ref } innerRef={ innerRef } { ...props } />
  ))

  return (
    <MuiMenuItem button component={ RouterLinkWithRef } to={ to } ref={ ref } { ...props } />
  )
})

export default MenuItemLink
