import { Schema } from 'bcp-47/lib/parse'

import { shouldBePresent } from '~/asserters/commonAsserters'

// declare global {
//   interface RegExpExecArray {
//     groups?: {
//         [key: string]: string | undefined
//     }
//   }
// }

/**
 * Parse {locale} as a [Spreadsheet locale](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets#SpreadsheetProperties).
 */
export default function parseSpreadsheetLocale(localeString: string): Schema {
  const groups = /(?<language>[a-z]{2,3})(?:_(?<region>[A-Z]{2}))?/i.exec(localeString)?.groups as {
    language: string
    region: string | undefined
  } | undefined

  shouldBePresent(groups)

  const { language, region } = groups

  return {
    language,
    extendedLanguageSubtags: [],
    script: null,
    region: region ?? null,
    variants: [],
    extensions: [],
    privateuse: [],
    irregular: null,
    regular: null,
  }
}
