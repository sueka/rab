import TextField, { TextFieldProps as OriginalTextFieldProps } from '@mui/material/TextField'
import { makeStyles } from '@mui/material/styles'
import classnames from 'classnames'
import hljs from 'highlight.js'
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useRecoilState } from 'recoil'

import { shouldBePresent } from '~/asserters/commonAsserters'
import DefaultDarkContext from '~/contexts/DefaultDarkContext'
import IntlProviderContext from '~/contexts/IntlProviderContext'
import useRefsMerged from '~/hooks/useRefsMerged'
import darkState from '~/selectors/darkState'
import typed from '~/typed'
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

type HighlightTheme = string // TODO

interface OwnProps {
  lightTheme?: HighlightTheme
  darkTheme?: HighlightTheme
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
  direction?: Direction
  startAdornmentWidth?: number
  endAdornmentWidth?: number
}

const useStyles = makeStyles<never, StyleProps, 'Pre' | 'TextArea'>({
  Pre: {
    '&$Pre': {
      direction: 'ltr',
      width: ({ startAdornmentWidth, endAdornmentWidth }) => `calc(100% - ${ (startAdornmentWidth ?? 0) + (endAdornmentWidth ?? 0) }px)`,

      // NOTE: ページの direction が "rtl" なら starAdornment は右側に配置されるが、この要素の direction は "ltr" に固定されるので、 marginInlineStart 等を使うことはできない。
      marginLeft: ({ direction, startAdornmentWidth, endAdornmentWidth }) => direction === 'rtl' ? endAdornmentWidth : startAdornmentWidth,
      marginRight: ({ direction, startAdornmentWidth, endAdornmentWidth }) => direction === 'rtl' ? startAdornmentWidth : endAdornmentWidth,
    },
  },
  TextArea: {
    '&$TextArea': {
      direction: 'ltr',
    },
  },
}, {
  flip: false,
})

// TODO: remove?
// TODO: null check を抽出する
function getWidth(element: HTMLElement | null | undefined): number | null {
  if (element == null) {
    return null
  }

  const { marginLeft, marginRight } = globalThis.getComputedStyle(element)

  return element.offsetWidth + parseFloat(marginLeft) + parseFloat(marginRight)
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

  const { dir } = useContext(IntlProviderContext)
  const [dark] = useRecoilState(darkState)
  const { defaultDark } = useContext(DefaultDarkContext)

  const [hlText, setHlText] = useState<string | null>(null)
  const [startAdornmentWidth, setStartAdornmentWidth] = useState<number | null>(null)
  const [endAdornmentWidth, setEndAdornmentWidth] = useState<number | null>(null)

  const jssClasses = useStyles({
    direction: dir ?? undefined,
    startAdornmentWidth: startAdornmentWidth ?? undefined,
    endAdornmentWidth: endAdornmentWidth ?? undefined,
  })

  const containerClassName = useMemo(() => classnames(className, cssClasses.Container), [className])
  const InputInputMultilineClassName = useMemo(() => classnames(jssClasses.TextArea, cssClasses.TextArea, inputMultiline), [jssClasses.TextArea, inputMultiline])
  const preClassName = useMemo(() => classnames(jssClasses.Pre, cssClasses.Pre, preProps?.className), [jssClasses.Pre, preProps?.className])

  const OwnInputRef = useRef<HTMLDivElement>(null)
  const InputRef = useRefsMerged(InputRefProp ?? null, OwnInputRef)

  const ownInputRef = useRef<HTMLTextAreaElement>(null)
  const inputRef = useRefsMerged(inputRefProp ?? null, ownInputRef)

  useEffect(() => {
    const startAdornment = OwnInputRef.current?.querySelector<HTMLElement>(':scope > [class*="MuiInputAdornment-positionStart"]') // TODO
    const endAdornment = OwnInputRef.current?.querySelector<HTMLElement>(':scope > [class*="MuiInputAdornment-positionEnd"]') // TODO

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

  shouldBePresent(defaultDark)

  return (
    <div className={ containerClassName }>
      <Helmet>
        <link
          rel="stylesheet"
          href={ typed<[HighlightTheme]>`/assets/stylesheets/highlight.js/styles/${ (dark ?? defaultDark) ? darkTheme : lightTheme }.css` }
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
  )
}

export default CodeField
