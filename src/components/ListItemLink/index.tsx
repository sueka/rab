import * as React from 'react'
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom'

import MuiListItem, { ListItemProps as MuiListItemProps } from '@material-ui/core/ListItem'

type ListItemLinkProps = MuiListItemProps<typeof RouterLink, { button?: true }>

const ListItemLink: React.FunctionComponent<ListItemLinkProps> = React.forwardRef<RouterLink, React.PropsWithoutRef<ListItemLinkProps>>(({ to, button, innerRef, ...props }, ref) => {
  // See https://material-ui.com/guides/composition/#link
  const RouterLinkWithRef = React.forwardRef<RouterLink, RouterLinkProps>((props, ref) => (
    <RouterLink ref={ ref } innerRef={ innerRef } { ...props } />
  ))

  return (
    <MuiListItem button component={ RouterLinkWithRef } to={ to } ref={ ref } { ...props } />
  )
})

export default ListItemLink
