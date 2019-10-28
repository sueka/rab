import React from 'react'
import { FormattedMessage } from 'react-intl'
import { v4 } from 'uuid'

import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select, { SelectProps } from '@material-ui/core/Select'

import { Tag, isTag, getNativeNameByTag } from '~/lib/languageNameSolver'

import messages from './messages'

export interface StateProps {
  availableLocales: Tag[]
  locale: Tag
}

export interface DispatchProps {
  select(locale: Tag): void
}

type Props =
  & StateProps
  & DispatchProps

const LocaleSelect: React.FunctionComponent<Props> = ({ availableLocales, locale, select }) => {
  const [labelWidth, setLabelWidth] = React.useState<number>(0)
  const inputId = React.useMemo(v4, [])

  const inputLabel = React.useCallback((node: HTMLLabelElement | null) => { // TODO: type
    if (node !== null) {
      setLabelWidth(node.offsetWidth)
    }
  }, [setLabelWidth])

  const handleChange = React.useCallback<NonNullable<SelectProps['onChange']>>((event) => {
    if (isTag(event.target.value)) {
      select(event.target.value)
    }
  }, [])

  return (
    <FormControl>
      <InputLabel ref={ inputLabel } htmlFor={ inputId }>
        <FormattedMessage { ...messages.languages } />
      </InputLabel>
      <Select native labelWidth={ labelWidth } value={ locale } onChange={ handleChange } id={ inputId } inputProps={ { 'data-testid': 'localeSelect' } }>
        { availableLocales.map((availableLocale, i) => (
          <option key={ i } value={ availableLocale }>{ getNativeNameByTag(availableLocale) }</option>
        )) }
      </Select>
    </FormControl>
  )
}

export default LocaleSelect
