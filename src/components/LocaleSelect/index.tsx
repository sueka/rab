import classnames from 'classnames'
import React, { useCallback, useMemo, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { v4 } from 'uuid'

import FilledInput from '@material-ui/core/FilledInput'
import FormControl, { FormControlProps } from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Select, { SelectProps } from '@material-ui/core/Select'
import { useTheme } from '@material-ui/core/styles'

import { Tag, getNativeNameByTag, isTag } from '~/lib/languageNameSolver'
import { State } from '~/redux'
import { selectLocale } from '~/redux/modules/localeSelector'
import messages from './messages'

interface OwnProps {
  classes?: {
    root?: string
    label?: string
    input?: string
    selectIcon?: string
    inputUnderline?: string
  } | null
  FormControlProps?: FormControlProps | null
}

interface StateProps {
  availableLocales: Tag[]
  locale: Tag
}

interface DispatchProps {
  selectLocale(locale: Tag): void
}

type Props =
  & OwnProps
  & StateProps
  & DispatchProps

export /* for testing */ const LocaleSelect: React.FunctionComponent<Props> = ({ classes, FormControlProps, availableLocales, locale, selectLocale }) => {
  const [labelWidth, setLabelWidth] = useState<number>(0)
  const inputId = useMemo(v4, [])
  const theme = useTheme()

  // NOTE: Fortunately, FormControl is nothing but FormControl.
  const variant = useMemo(() => FormControlProps?.variant ?? theme?.props?.MuiFormControl?.variant ?? 'standard', [FormControlProps?.variant, theme?.props?.MuiFormControl?.variant])

  const rootClassName = useMemo(() => classnames(classes?.root, FormControlProps?.className), [classes?.root, FormControlProps?.className])
  const labelClassName = useMemo(() => classnames(classes?.label), [classes?.label])
  const inputClassName = useMemo(() => classnames(classes?.input), [classes?.input])
  const selectIconClassName = useMemo(() => classnames(classes?.selectIcon), [classes?.selectIcon])
  const inputUnderlineClassName = useMemo(() => classnames(classes?.inputUnderline), [classes?.inputUnderline])

  const inputLabel = useCallback((node: HTMLLabelElement | null) => { // TODO: type
    if (node !== null) {
      setLabelWidth(node.offsetWidth)
    }
  }, [])

  const handleChange = useCallback<NonNullable<SelectProps['onChange']>>((event) => {
    if (isTag(event.target.value)) {
      selectLocale(event.target.value)
    }
  }, [])

  return (
    <FormControl
      { ...FormControlProps }
      className={ rootClassName } // NOTE: override FormControlProps.className
    >
      <InputLabel className={ labelClassName } ref={ inputLabel } htmlFor={ inputId }>
        <FormattedMessage { ...messages.languages } />
      </InputLabel>
      <Select
        classes={ {
          icon: selectIconClassName,
        } }
        native
        labelWidth={ labelWidth }
        value={ locale }
        onChange={ handleChange }
        id={ inputId }
        inputProps={ { 'data-testid': 'localeSelect' } }
        input={ {
          standard: (
            <Input
              className={ inputClassName }
              classes={ {
                underline: inputUnderlineClassName,
              } }
            />
          ),
          outlined: <OutlinedInput className={ inputClassName } labelWidth={ labelWidth } />,
          filled: <FilledInput className={ inputClassName } />,
        }[variant] }
      >
        { availableLocales.map((availableLocale, i) => (
          <option key={ i } value={ availableLocale }>{ getNativeNameByTag(availableLocale) }</option>
        )) }
      </Select>
    </FormControl>
  )
}

// connect

const mapStateToProps = ({ localeSelector: { availableLocales, locale } }: State): StateProps => ({
  availableLocales,
  locale,
})

const mapDispatchToProps: DispatchProps = {
  selectLocale,
}

export default connect(mapStateToProps, mapDispatchToProps)(LocaleSelect)
