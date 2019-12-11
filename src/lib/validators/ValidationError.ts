import { MessageValue } from 'react-intl'

import { AbstractError } from '~/lib/errors'

export default class ValidationError extends AbstractError {
  constructor(message?: string)
  constructor(message: string, type: string, values: Record<string, MessageValue>)
  constructor(message?: string, public type?: string, public values?: Record<string, MessageValue>) {
    super(message)
  }
}
