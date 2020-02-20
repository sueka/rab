import React from 'react'

import List from '@material-ui/core/List'

import { Props as TaskListItemProps } from '~/components/Reminder/TaskListItem'

export interface Props {
  children?: React.ReactElement<TaskListItemProps, React.ComponentType<TaskListItemProps>> | React.ReactElement<TaskListItemProps, React.ComponentType<TaskListItemProps>>[]
}

const TaskList: React.FunctionComponent<Props> = ({ children }) => (
  <List>
    { children }
  </List>
)

export default TaskList
