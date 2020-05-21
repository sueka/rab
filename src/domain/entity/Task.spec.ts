import uuid from 'uuid'

import TaskId from '~/domain/vo/TaskId'
import Task from './Task'

const { v4 } = jest.requireActual('uuid') as typeof uuid

describe('Task', () => {
  describe('#equals', () => {
    it('should compare states of objects', () => {
      const id = new TaskId(v4())

      const a = new Task({ id, content: 'Buy eggs', done: false })
      const b = new Task({ id, content: 'Pick up my package at the post office', done: false })

      expect(a.equals(b)).toBeFalsy()
    })
  })

  describe('#isIdenticalTo', () => {
    it('should compare IDs of objects', () => {
      const id = new TaskId(v4())

      const a = new Task({ id, content: 'Buy eggs', done: false })
      const b = new Task({ id, content: 'Pick up my package at the post office', done: false })

      expect(a.isIdenticalTo(b)).toBeTruthy()
    })
  })
})
