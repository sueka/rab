import { PrimitiveType } from 'intl-messageformat'

import AbstractError from '~/lib/errors/AbstractError'

/**
 * @param key of results of defineMessages from react-intl
 * @param values for react-intl
 */
export default class ValidationError extends AbstractError {
  /**
   * @param message as an error message
   */
  constructor(message?: string)
  constructor(message: string, key: string, values: Record<string, PrimitiveType>)
  constructor(message?: string, public key?: string, public values?: Record<string, PrimitiveType>) {
    super(message)
  }
}
