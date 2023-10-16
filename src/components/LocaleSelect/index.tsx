import FilledInput from '@mui/material/FilledInput'
import FormControl, { FormControlProps } from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select, { SelectProps } from '@mui/material/Select'
import { useTheme } from '@mui/material/styles'
import classnames from 'classnames'
import { OrderedSet } from 'immutable'
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { connect } from 'react-redux'
import { makeStyles } from 'tss-react/mui'
import { v4 } from 'uuid'

import IntlProviderContext from '~/contexts/IntlProviderContext'
import { Tag, getNativeNameByTag, isTag } from '~/languageNameSolver'
import { State } from '~/redux'
import { selectLocale } from '~/redux/modules/localeSelector'
import cssClasses from './classes.css'
import messages from './messages'

interface OwnProps {
  hiddenLabel?: boolean
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

const useStyles = makeStyles<StyleProps>()<'Select' | 'Option'>((theme, { selectMinWidth }) => ({
  Select: {
    minWidth: selectMinWidth,
  },
  Option: {
    // backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
}))

export /* for testing */ const LocaleSelect: React.FC<Props> = ({ hiddenLabel = false, classes: propClasses, FormControlProps, locale, selectLocale }) => {
  const { formatMessage } = useIntl()
  const [selectMinWidth, setSelectMinWidth] = useState<number | null>(null)
  const inputId = useMemo(v4, [])
  const theme = useTheme()
  const { dir } = useContext(IntlProviderContext)
  const { classes: jssClasses } = useStyles({ selectMinWidth: selectMinWidth ?? undefined })

  // NOTE: Fortunately, FormControl is nothing but FormControl.
  const variant = useMemo(() => FormControlProps?.variant ?? theme?.components?.MuiFormControl?.defaultProps?.variant ?? 'standard', [FormControlProps?.variant, theme?.components?.MuiFormControl?.defaultProps?.variant])

  const rootClassName = useMemo(() => classnames(propClasses?.root, FormControlProps?.className), [propClasses?.root, FormControlProps?.className])
  const labelClassName = useMemo(() => classnames(propClasses?.label, cssClasses.InputLabel), [propClasses?.label])
  const selectSelectClassName = useMemo(() => classnames(jssClasses.Select, cssClasses.Select), [jssClasses.Select])
  const inputClassName = useMemo(() => classnames(propClasses?.input), [propClasses?.input])
  const selectIconClassName = useMemo(() => classnames(propClasses?.selectIcon), [propClasses?.selectIcon])
  const inputUnderlineClassName = useMemo(() => classnames(propClasses?.inputUnderline), [propClasses?.inputUnderline])

  const inputLabel = useRef<HTMLLabelElement>(null)
  const select = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (inputLabel.current === null) {
      return
    }

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
      variant="standard"
      { ...FormControlProps }
      hiddenLabel={ hiddenLabel }
      className={ rootClassName } // NOTE: Overrides FormControlProps.className
    >
      { !hiddenLabel && (
        <InputLabel className={ labelClassName } ref={ inputLabel } htmlFor={ inputId }>
          <FormattedMessage { ...messages.language } />
        </InputLabel>
      ) }
      <Select
        variant="standard"
        native
        classes={ {
          select: selectSelectClassName,
          icon: selectIconClassName,
        } }
        ref={ select }
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
          outlined: <OutlinedInput className={ inputClassName } />,
          filled: <FilledInput className={ inputClassName } />,
        }[variant] }
      >
        { availableLocales?.map((availableLocale, i) => {
          const label = OrderedSet([
            formatMessage(messages[availableLocale]), // exonym
            getNativeNameByTag(availableLocale), // endonym
          ]).join(' - ')

          return (
            <option key={ i } className={ jssClasses.Option } value={ availableLocale }>{ label }</option>
          )
        }) }
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
