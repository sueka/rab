import FilledInput from '@material-ui/core/FilledInput'
import FormControl, { FormControlProps } from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Select, { SelectProps } from '@material-ui/core/Select'
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles'
import classNames from 'classnames'
import classnames from 'classnames'
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { v4 } from 'uuid'

import IntlProviderContext from '~/lib/contexts/IntlProviderContext'
import { Tag, getNativeNameByTag, isTag } from '~/lib/languageNameSolver'
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

interface StyleProps {
  selectMinWidth?: number
}

const useStyles = makeStyles<Theme, StyleProps, 'Select'>({
  Select: {
    minWidth: ({ selectMinWidth }) => selectMinWidth,
  },
})

export /* for testing */ const LocaleSelect: React.FC<Props> = ({ classes: propClasses, FormControlProps, locale, selectLocale }) => {
  const [labelWidth, setLabelWidth] = useState<number | null>(null)
  const [selectMinWidth, setSelectMinWidth] = useState<number | null>(null)
  const inputId = useMemo(v4, [])
  const theme = useTheme()
  const { dir } = useContext(IntlProviderContext)
  const jssClasses = useStyles({ selectMinWidth: selectMinWidth ?? undefined })

  // NOTE: Fortunately, FormControl is nothing but FormControl.
  const variant = useMemo(() => FormControlProps?.variant ?? theme?.props?.MuiFormControl?.variant ?? 'standard', [FormControlProps?.variant, theme?.props?.MuiFormControl?.variant])

  const rootClassName = useMemo(() => classnames(propClasses?.root, FormControlProps?.className), [propClasses?.root, FormControlProps?.className])
  const labelClassName = useMemo(() => classnames(propClasses?.label, cssClasses.InputLabel), [propClasses?.label])
  const selectSelectClassName = useMemo(() => classNames(jssClasses.Select, cssClasses.Select), [jssClasses.Select])
  const inputClassName = useMemo(() => classnames(propClasses?.input), [propClasses?.input])
  const selectIconClassName = useMemo(() => classnames(propClasses?.selectIcon), [propClasses?.selectIcon])
  const inputUnderlineClassName = useMemo(() => classnames(propClasses?.inputUnderline), [propClasses?.inputUnderline])

  const inputLabel = useRef<HTMLLabelElement>(null)
  const select = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (inputLabel.current === null) {
      return
    }

    setLabelWidth(inputLabel.current.offsetWidth)

    if (select.current === null) {
      return
    }

    const selectSelect = select.current.querySelector(`:scope > .${ cssClasses.Select }`)

    if (selectSelect === null || !(selectSelect instanceof HTMLDivElement)) {
      return
    }

    const rect = inputLabel.current.getBoundingClientRect() // NOTE: node.offsetWidth は transform 前の値、 rect.width は transform 後の値を返す。

    const style = globalThis.getComputedStyle(selectSelect)

    // NOTE: document.dir 変更前なので style.paddingInlineStart 等で得ることはできない。
    const paddingInlineStart = parseFloat(dir === 'ltr' ? style.paddingLeft : style.paddingRight)
    const paddingInlineEnd = parseFloat(dir === 'ltr' ? style.paddingRight : style.paddingLeft)

    // tslint:disable-next-line:no-object-mutation
    setSelectMinWidth(rect.width + paddingInlineStart - paddingInlineEnd)
  }, [locale, dir])

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
          select: selectSelectClassName,
          icon: selectIconClassName,
        } }
        ref={ select }
        labelWidth={ labelWidth ?? undefined }
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
          outlined: <OutlinedInput className={ inputClassName } labelWidth={ labelWidth ?? undefined } />,
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
