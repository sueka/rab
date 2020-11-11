import List from '@material-ui/core/List'
import React from 'react'

import { Props as TaskListItemDropTargetProps } from '~/components/Reminder/TaskListItemDropTarget'

export interface Props {
  children?: React.ReactElement<TaskListItemDropTargetProps, React.ComponentType<TaskListItemDropTargetProps>> | Array<React.ReactElement<TaskListItemDropTargetProps, React.ComponentType<TaskListItemDropTargetProps>>>
}

const TaskList: React.FC<Props> = ({ children }) => (
  <List>
    { children }
  </List>
)

export default TaskList
