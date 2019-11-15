import * as React from 'react'

import MuiMenuItem, { MenuItemProps as MuiMenuItemProps } from '@material-ui/core/MenuItem'

import RouterLink, { Props as RouterLinkProps } from '~/lib/components/Link'

type MenuItemLinkProps = MuiMenuItemProps<typeof RouterLink, { button?: true }>

const MenuItemLink: React.FunctionComponent<MenuItemLinkProps> = React.forwardRef<RouterLink, React.PropsWithoutRef<MenuItemLinkProps>>(({ to, button, innerRef, ...menuItemProps }, menuItem) => {
  // See https://material-ui.com/guides/composition/#link
  const RouterLinkWithRef = React.forwardRef<RouterLink, RouterLinkProps>((linkProps, link) => (
    <RouterLink ref={ link } innerRef={ innerRef } color="inherit" underline="none" { ...linkProps } />
  ))

  return (
    <MuiMenuItem button component={ RouterLinkWithRef } to={ to } ref={ menuItem } { ...menuItemProps } />
  )
})

export default MenuItemLink
