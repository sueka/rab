import TextField, { TextFieldProps as OriginalTextFieldProps } from '@material-ui/core/TextField'
import { ThemeProvider, makeStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
import hljs from 'highlight.js'
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'

import configureTheme from '~/configureTheme'
import ThemeProviderContext from '~/contexts/ThemeProviderContext'
import useRefsMerged from '~/lib/hooks/useRefsMerged'
import typed from '~/lib/typed'
import cssClasses from './classes.css'

type TextFieldProps =
  & Alt.Omit<OriginalTextFieldProps,
      | 'className'
      | 'fullWidth' // TODO
      | 'multiline' // TODO
    >
  & {
      value?: string
    }

interface OwnProps {
  lightTheme?: string
  darkTheme?: string
  className?: string
  preProps?: Alt.Omit<React.InputHTMLAttributes<HTMLPreElement>, 'dangerouslySetInnerHTML'>
}

/**
 * @param className of the container
 */
type Props =
  & TextFieldProps
  & OwnProps

interface StyleProps {
  startAdornmentWidth?: number
  endAdornmentWidth?: number
}

const useStyles = makeStyles<never, StyleProps, 'Pre'>({
  Pre: {
    '&$Pre': {
      marginInlineStart: ({ startAdornmentWidth }) => startAdornmentWidth,
      marginInlineEnd: ({ endAdornmentWidth }) => endAdornmentWidth,
    },
  },
})

// TODO: remove?
// TODO: null check を抽出する
function getWidth(element: HTMLElement | null | undefined): number | null {
  if (element == null) {
    return null
  }

  const { marginInlineStart, marginInlineEnd } = globalThis.getComputedStyle(element)

  return element.offsetWidth + parseFloat(marginInlineStart) + parseFloat(marginInlineEnd)
}

const CodeField: React.FC<Props> = ({
  lightTheme = 'atom-one-light',
  darkTheme = 'atom-one-dark',
  className,
  InputProps: { classes: InputPropsClasses, ref: InputRefProp, ...RestInputProps } = {},
  inputProps: { spellCheck, ref: inputRefProp, ...restInputProps } = {},
  preProps,
  value,
  onChange,
  ...restProps
}) => {
  const { inputMultiline, ...InputPropsRestClasses } = InputPropsClasses ?? {}

  const { dark } = useContext(ThemeProviderContext)
  const Theme = useMemo(() => dark != null ? configureTheme({ direction: 'ltr', dark }) : null, [dark])

  const [hlText, setHlText] = useState<string | null>(null)
  const [startAdornmentWidth, setStartAdornmentWidth] = useState<number | null>(null)
  const [endAdornmentWidth, setEndAdornmentWidth] = useState<number | null>(null)

  const jssClasses = useStyles({
    startAdornmentWidth: startAdornmentWidth ?? undefined,
    endAdornmentWidth: endAdornmentWidth ?? undefined,
  })

  const containerClassName = useMemo(() => classnames(className, cssClasses.Container), [className])
  const InputInputMultilineClassName = useMemo(() => classnames(cssClasses.TextArea, inputMultiline), [inputMultiline])
  const preClassName = useMemo(() => classnames(jssClasses.Pre, cssClasses.Pre, preProps?.className), [jssClasses.Pre, preProps?.className])

  const OwnInputRef = useRef<HTMLDivElement>(null)
  const InputRef = useRefsMerged(InputRefProp ?? null, OwnInputRef)

  const ownInputRef = useRef<HTMLTextAreaElement>(null)
  const inputRef = useRefsMerged(inputRefProp ?? null, ownInputRef)

  useEffect(() => {
    const startAdornment = OwnInputRef.current?.querySelector<HTMLElement>(':scope > .MuiInputAdornment-root.MuiInputAdornment-positionStart')
    const endAdornment = OwnInputRef.current?.querySelector<HTMLElement>(':scope > .MuiInputAdornment-root.MuiInputAdornment-positionEnd')

    setStartAdornmentWidth(getWidth(startAdornment))
    setEndAdornmentWidth(getWidth(endAdornment))
  }, [OwnInputRef])

  useEffect(() => {
    setHlText(hljs.highlightAuto(ownInputRef.current?.value ?? '').value)
  }, [ownInputRef])

  const handleChange = useCallback<React.ChangeEventHandler<HTMLTextAreaElement>>((event) => {
    onChange?.(event)

    setHlText(hljs.highlightAuto(
      (onChange === undefined ? value : undefined) // NOTE: `onChange` が無く、 `value` がある場合、テキストフィールドの内容は変更されない。また、 `onChange` がある場合、このイベントが発火した時の `value` の値は `onChange` 中の setState が完了する前のものなので、 `event.target.value` （または `input.current?.value ?? ''` ）を参照する必要がある。
      ?? event.target.value
    ).value)
  }, [value, onChange])

  if (dark == null || Theme === null) {
    return null
  }

  return (
    <ThemeProvider theme={ Theme }>
      <div className={ containerClassName } dir="ltr">
        <Helmet>
          <link
            rel="stylesheet"
            href={ typed<[string]>`/assets/stylesheets/highlight.js/styles/${ dark ? darkTheme : lightTheme }.css` }
          />
        </Helmet>
        <pre className={ preClassName } dangerouslySetInnerHTML={ { __html: hlText ?? '' } } />
        <TextField
          fullWidth // TODO: false でもうまく動くようにする
          multiline // TODO: false でもうまく動くようにする
          value={ value }
          onChange={ handleChange }
          InputProps={ {
            classes: {
              inputMultiline: InputInputMultilineClassName,
              ...InputPropsRestClasses,
            },
            ref: InputRef,
            ...RestInputProps,
          } }
          inputProps={ {
            spellCheck: spellCheck ?? false,
            ref: inputRef,
            ...restInputProps,
          } }
          { ...restProps }
        />
      </div>
    </ThemeProvider>
  )
}

export default CodeField
