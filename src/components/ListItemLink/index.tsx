import * as React from 'react'
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom'

import MuiListItem, { ListItemProps as MuiListItemProps } from '@material-ui/core/ListItem'

type ListItemLinkProps = MuiListItemProps<typeof RouterLink, { button?: true }>

// TODO: delete this; See also https://material-ui.com/guides/composition/#link
const RouterLinkWithRef = React.forwardRef<HTMLAnchorElement, RouterLinkProps>((props, ref) => (
  <RouterLink innerRef={ ref } { ...props } />
))

const ListItemLink: React.FunctionComponent<ListItemLinkProps> = ({ to, button, ref, ...props }) => (
  <MuiListItem button component={ RouterLinkWithRef } to={ to } { ...props } />
)

export default ListItemLink
