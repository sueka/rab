import { asJson, listOf } from './commonValidators'

const asValue = asJson
export const asListValue = listOf(asValue)
