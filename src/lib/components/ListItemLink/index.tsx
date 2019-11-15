import * as React from 'react'

import MuiListItem, { ListItemProps as MuiListItemProps } from '@material-ui/core/ListItem'

import RouterLink, { Props as RouterLinkProps } from '~/lib/components/Link'

type ListItemLinkProps = MuiListItemProps<typeof RouterLink, { button?: true }>

const ListItemLink: React.FunctionComponent<ListItemLinkProps> = React.forwardRef<RouterLink, React.PropsWithoutRef<ListItemLinkProps>>(({ to, button, innerRef, ...listItemProps }, listItem) => {
  // See https://material-ui.com/guides/composition/#link
  const RouterLinkWithRef = React.forwardRef<RouterLink, RouterLinkProps>((linkProps, link) => (
    <RouterLink ref={ link } innerRef={ innerRef } color="inherit" underline="none" { ...linkProps } />
  ))

  return (
    <MuiListItem button component={ RouterLinkWithRef } to={ to } ref={ listItem } { ...listItemProps } />
  )
})

export default ListItemLink
