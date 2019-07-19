import * as React from 'react'
import { FormattedMessage } from 'react-intl'

import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import NativeSelect from '@material-ui/core/NativeSelect'

import { Code, isCode, getNativeNameByCode } from '../../lib/languageNameSolver'

import messages from './messages'

export interface StateProps {
  availableLocales: Code[]
  locale: Code
}

export interface DispatchProps {
  select(locale: Code): void
}

type Props =
  & StateProps
  & DispatchProps

export default class LocaleSelect extends React.Component<Props> {
  private handleChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    const { select } = this.props

    if (isCode(event.currentTarget.value)) {
      select(event.currentTarget.value)
    }
  }

  public render() {
    const { availableLocales, locale } = this.props

    return (
      <FormControl>
        <InputLabel>
          <FormattedMessage { ...messages.languages } />
        </InputLabel>
        <NativeSelect value={ locale } onChange={ this.handleChange }>
          { availableLocales.map((availableLocale, i) => (
            <option key={ i } value={ availableLocale }>{ getNativeNameByCode(availableLocale) }</option>
          )) }
        </NativeSelect>
      </FormControl>
    )
  }
}
