import React from 'react'
import { FormattedMessage } from 'react-intl'
import classnames from 'classnames'
import { v4 } from 'uuid'

import { useTheme } from '@material-ui/core/styles'
import FormControl, { FormControlProps } from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import FilledInput from '@material-ui/core/FilledInput'
import InputLabel from '@material-ui/core/InputLabel'
import Select, { SelectProps } from '@material-ui/core/Select'

import { Tag, isTag, getNativeNameByTag } from '~/lib/languageNameSolver'

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

export interface StateProps {
  availableLocales: Tag[]
  locale: Tag
}

export interface DispatchProps {
  select(locale: Tag): void
}

type Props =
  & OwnProps
  & StateProps
  & DispatchProps

const LocaleSelect: React.FunctionComponent<Props> = ({ classes, FormControlProps, availableLocales, locale, select }) => {
  const [labelWidth, setLabelWidth] = React.useState<number>(0)
  const inputId = React.useMemo(v4, [])
  const theme = useTheme()

  // NOTE: Fortunately, FormControl is nothing but FormControl.
  const variant = React.useMemo(() => {
    if (FormControlProps != null && FormControlProps.variant !== undefined) {
      return FormControlProps.variant
    }

    if (theme.props !== undefined && theme.props.MuiFormControl !== undefined && theme.props.MuiFormControl.variant !== undefined) {
      return theme.props.MuiFormControl.variant
    }

    return 'standard'
  }, [FormControlProps, theme]) // TODO: FormControlProps?.variant, theme?.props?.MuiFormControl?.variant

  const rootClassName = React.useMemo(() => classnames(classes != null ? classes.root : classes, FormControlProps != null ? FormControlProps.className : FormControlProps), [classes, FormControlProps]) // TODO: classes?.root, FormControlProps?.className
  const labelClassName = React.useMemo(() => classnames(classes != null ? classes.label : classes), [classes]) // TODO: classes?.label
  const inputClassName = React.useMemo(() => classnames(classes != null ? classes.input : classes), [classes]) // TODO: classes?.input
  const selectIconClassName = React.useMemo(() => classnames(classes != null ? classes.selectIcon : classes), [classes]) // TODO: classes?.selectIcon
  const inputUnderlineClassName = React.useMemo(() => classnames(classes != null ? classes.inputUnderline : classes), [classes]) // TODO: classes?.inputUnderline

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
          standard: <Input
            className={ inputClassName }
            classes={ {
              underline: inputUnderlineClassName,
            } }
          />,
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

export default LocaleSelect
