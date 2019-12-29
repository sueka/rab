import React from 'react'

import { AbstractError } from '~/lib/errors'

export default class ValidationError extends AbstractError {
  constructor(message?: string)
  constructor(message: string, type: string, values: Record<string, React.ReactNode>)
  constructor(message?: string, public type?: string, public values?: Record<string, React.ReactNode>) {
    super(message)
  }
}
