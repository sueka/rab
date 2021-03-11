import FilledInput from '@material-ui/core/FilledInput'
import FormControl, { FormControlProps } from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Select, { SelectProps } from '@material-ui/core/Select'
import { useTheme } from '@material-ui/core/styles'
import classnames from 'classnames'
import React, { useCallback, useContext, useMemo, useRef, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { v4 } from 'uuid'

import IntlProviderContext from '~/lib/contexts/IntlProviderContext'
import { Tag, getNativeNameByTag, isTag } from '~/lib/languageNameSolver'
import typed from '~/lib/typed'
import { State } from '~/redux'
import { selectLocale } from '~/redux/modules/localeSelector'
import cssClasses from './classes.css'
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
  locale: Tag
}

interface DispatchProps {
  selectLocale(locale: Tag): void
}

type Props =
  & OwnProps
  & StateProps
  & DispatchProps

export /* for testing */ const LocaleSelect: React.FC<Props> = ({ classes: propClasses, FormControlProps, locale, selectLocale }) => {
  const [labelWidth, setLabelWidth] = useState<number>(0)
  const inputId = useMemo(v4, [])
  const theme = useTheme()

  // NOTE: Fortunately, FormControl is nothing but FormControl.
  const variant = useMemo(() => FormControlProps?.variant ?? theme?.props?.MuiFormControl?.variant ?? 'standard', [FormControlProps?.variant, theme?.props?.MuiFormControl?.variant])

  const rootClassName = useMemo(() => classnames(propClasses?.root, FormControlProps?.className), [propClasses?.root, FormControlProps?.className])
  const labelClassName = useMemo(() => classnames(propClasses?.label, cssClasses.InputLabel), [propClasses?.label])
  const inputClassName = useMemo(() => classnames(propClasses?.input), [propClasses?.input])
  const selectIconClassName = useMemo(() => classnames(propClasses?.selectIcon), [propClasses?.selectIcon])
  const inputUnderlineClassName = useMemo(() => classnames(propClasses?.inputUnderline), [propClasses?.inputUnderline])

  const select = useRef<HTMLDivElement>(null)

  const inputLabel = useCallback<React.RefCallback<HTMLLabelElement>>((node) => {
    if (node !== null) {
      setLabelWidth(node.offsetWidth)

      if (select.current === null) {
        return
      }

      const selectSelect = select.current.querySelector(`:scope > .${ cssClasses.Select }`)

      if (selectSelect === null || !(selectSelect instanceof HTMLDivElement)) {
        return
      }

      const rect = node.getBoundingClientRect()

      // tslint:disable-next-line:no-object-mutation
      selectSelect.style.minWidth = typed<[number]>`${ rect.width }px` // FIXME: style を操作しないようにする
    }
  }, [select.current]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = useCallback<NonNullable<SelectProps['onChange']>>((event) => {
    if (isTag(event.target.value)) {
      selectLocale(event.target.value)
    }
  }, [selectLocale])

  const { availableLocales } = useContext(IntlProviderContext)

  return (
    <FormControl
      { ...FormControlProps }
      className={ rootClassName } // NOTE: Overrides FormControlProps.className
    >
      <InputLabel className={ labelClassName } ref={ inputLabel } htmlFor={ inputId }>
        <FormattedMessage { ...messages.languages } />
      </InputLabel>
      <Select
        classes={ {
          select: cssClasses.Select,
          icon: selectIconClassName,
        } }
        ref={ select }
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
        { availableLocales?.map((availableLocale, i) => (
          <MenuItem key={ i } value={ availableLocale }>{ getNativeNameByTag(availableLocale) }</MenuItem>
        )) }
      </Select>
    </FormControl>
  )
}

// connect

const mapStateToProps = ({ localeSelector: { locale } }: State): StateProps => ({
  locale,
})

const mapDispatchToProps: DispatchProps = {
  selectLocale,
}

export default connect(mapStateToProps, mapDispatchToProps)(LocaleSelect)
