import { connect } from 'react-redux'

import { State } from 'src/redux'
import { addTaskAsync, changeTaskContentAsync, markTaskAsDoneAsync, markTaskAsUndoneAsync, deleteTaskAsync, moveTask } from 'src/redux/modules/reminder'
import Reminder, { StateProps, DispatchProps } from 'src/components/Reminder'

const mapStateToProps = ({ reminder: { tasks } }: State): StateProps => ({
  tasks,
})

const mapDispatchToProps: DispatchProps = {
  addTask: addTaskAsync,
  changeTaskContent: changeTaskContentAsync,
  markTaskAsDone: markTaskAsDoneAsync,
  markTaskAsUndone: markTaskAsUndoneAsync,
  deleteTask: deleteTaskAsync,
  moveTask,
}

export default connect(mapStateToProps, mapDispatchToProps)(Reminder)
