import * as React from 'react'

import MenuItem, { MenuItemProps } from '@material-ui/core/MenuItem'

import Link, { Props as LinkProps } from '~/lib/components/Link'

type Props = MenuItemProps<typeof Link, { button?: true }>

const MenuItemLink: React.FunctionComponent<Props> = React.forwardRef<Link, React.PropsWithoutRef<Props>>(({ to, button, innerRef, ...menuItemProps }, menuItem) => {
  // See https://material-ui.com/guides/composition/#link
  const LinkWithRef = React.forwardRef<Link, LinkProps>((linkProps, link) => (
    <Link ref={ link } innerRef={ innerRef } color="inherit" underline="none" { ...linkProps } />
  ))

  return (
    <MenuItem button component={ LinkWithRef } to={ to } ref={ menuItem } { ...menuItemProps } />
  )
})

export default MenuItemLink
