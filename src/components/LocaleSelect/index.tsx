import * as React from 'react'

import NativeSelect from '@material-ui/core/NativeSelect'

import { Code, isCode, getNativeNameByCode } from '../../lib/languageNameSolver'

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
      <NativeSelect value={ locale } onChange={ this.handleChange }>
        { availableLocales.map((availableLocale, i) => (
          <option key={ i } value={ availableLocale }>{ getNativeNameByCode(availableLocale) }</option>
        )) }
      </NativeSelect>
    )
  }
}
