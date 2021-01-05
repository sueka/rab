import { List } from 'immutable'

import Task from '~/domain/entity/Task'
import ReminderId from '~/domain/vo/ReminderId'
import yieldThis from '~/lib/extensions/Unknown/yieldThis'
import { asInstanceOf, asObject, asString, listOf } from '~/lib/validators/commonValidators'
import Entity from './Entity'

const asDomainObjectSerializedReminder = asObject('a Reminder', (input) => ({
  id: asString(input.id),
  tasks: listOf(asString)(input.tasks),
}))

interface ReminderParams {
  id: ReminderId
  tasks: List<Task>
}

export default class Reminder extends Entity {
  private _tasks: List<Task>

  constructor({
    id,
    tasks,
  }: ReminderParams) {
    super(id)

    this._tasks = tasks
  }

  public static deserialize(serialized: string): Reminder {
    const deserialized = yieldThis(asDomainObjectSerializedReminder(JSON.parse(serialized)), (({ id, tasks }) => ({
      id: asInstanceOf(ReminderId)(ReminderId.deserialize(id)),
      tasks: List(tasks.map(Task.deserialize)),
    })))

    return new Reminder(deserialized)
  }

  public serialize(): string {
    return JSON.stringify({
      id: this.id.serialize(),
      tasks: this.tasks.map(task => task.serialize()),
    })
  }

  public hashCode() {
    // tslint:disable-next-line:no-let
    let result = 17

    result = 31 * result + this.id.hashCode()
    result = 31 * result + this.tasks.hashCode()

    return result
  }

  public with({
    tasks = this.tasks,
  }: Partial<Alt.Omit<ReminderParams, 'id'>>): Reminder {
    return new Reminder({ id: asInstanceOf(ReminderId)(this.id), tasks })
  }

  get tasks() {
    return this._tasks
  }

  set tasks(value) {
    this._tasks = value // tslint:disable-line:no-object-mutation
  }
}
