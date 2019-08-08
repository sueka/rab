import assert from 'assert'

import TaskId from 'src/domain/vo/TaskId'
import Entity from './Entity'

export interface TaskRequest {
  id?: TaskId
  content?: string
  done?: boolean
}

export default class Task extends Entity {
  private _content: string
  private _done: boolean

  constructor({
    id,
    content = '',
    done = false,
  }: TaskRequest) {
    super(id)

    this._content = content
    this._done = done
  }

  static deserialize(serialized: string): Task {
    const { id: serializedId, content, done } = JSON.parse(serialized)

    // TODO: shape & type check

    return new Task({ id: TaskId.deserialize(serializedId), content, done })
  }

  serialize(): string {
    return JSON.stringify({
      id: this.id.serialize(),
      content: this.content,
      done: this.done,
    })
  }

  get content() {
    return this._content
  }

  set content(value) {
    assert(value.length <= 140)

    this._content = value
  }

  get done() {
    return this._done
  }

  set done(value) {
    this._done = value
  }
}
