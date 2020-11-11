import ListItem, { ListItemProps } from '@material-ui/core/ListItem'
import * as React from 'react'

import Link, { Props as LinkProps } from '~/lib/components/Link'

type Props = ListItemProps<typeof Link, { button?: true }>

const ListItemLink: React.FC<Props> = React.forwardRef<Link, React.PropsWithoutRef<Props>>(({ to, button, innerRef, ...listItemProps }, listItem) => {
  // See https://material-ui.com/guides/composition/#link
  const LinkWithRef = React.forwardRef<Link, LinkProps>((linkProps, link) => (
    <Link ref={ link } innerRef={ innerRef } color="inherit" underline="none" { ...linkProps } />
  ))

  return (
    <ListItem button component={ LinkWithRef } to={ to } ref={ listItem } { ...listItemProps } />
  )
})

export default ListItemLink
