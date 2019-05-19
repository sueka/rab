import * as React from 'react'

export interface StateProps {
  availableLocales: string[]
  locale: string
}

export interface DispatchProps {
  select(locale: string): void
}

type Props =
  & StateProps
  & DispatchProps

export default class LocaleSelect extends React.Component<Props> {
  private handleChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    const { select } = this.props

    select(event.currentTarget.value)
  }

  public render() {
    const { availableLocales, locale } = this.props

    return (
      <select defaultValue={ locale } onChange={ this.handleChange }>
        { availableLocales.map((availableLocale, i) => (
          <option key={ i }>{ availableLocale }</option>
        )) }
      </select>
    )
  }
}
