import TextField, { TextFieldProps as OriginalTextFieldProps } from '@material-ui/core/TextField'
import classNames from 'classnames'
import classnames from 'classnames'
import hljs from 'highlight.js'
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'

import ThemeProviderContext from '~/contexts/ThemeProviderContext'
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

const CodeField: React.FC<Props> = ({
  lightTheme = 'atom-one-light',
  darkTheme = 'atom-one-dark',
  className,
  InputProps: { classes: InputPropsClasses, ...rest_InputProps } = {},
  inputProps: { spellCheck, ...restInputProps } = {},
  preProps,
  value,
  onChange,
  ...restProps
}) => {
  const { inputMultiline, ...InputPropsRestClasses } = InputPropsClasses ?? {}
  const [hlText, setHlText] = useState<string | null>(null)
  const { dark } = useContext(ThemeProviderContext)
  const containerClassName = useMemo(() => classnames(className, cssClasses.Container), [className])
  const InputInputMultilineClassName = useMemo(() => classNames(cssClasses.TextArea, inputMultiline), [inputMultiline])
  const preClassName = useMemo(() => classnames(cssClasses.Pre, preProps?.className), [preProps?.className])
  const input = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setHlText(hljs.highlightAuto(input.current?.value ?? '').value)
  }, [input])

  const handleChange = useCallback<React.ChangeEventHandler<HTMLTextAreaElement>>((event) => {
    onChange?.(event)

    setHlText(hljs.highlightAuto(
      (onChange === undefined ? value : undefined) // NOTE: `onChange` が無く、 `value` がある場合、テキストフィールドの内容は変更されない。また、 `onChange` がある場合、このイベントが発火した時の `value` の値は `onChange` 中の setState が完了する前のものなので、 `event.target.value` （または `input.current?.value ?? ''` ）を参照する必要がある。
      ?? event.target.value
    ).value)
  }, [value, onChange])

  if (dark == null) {
    return null
  }

  return (
    <div className={ containerClassName }>
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
        inputRef={ input }
        value={ value }
        onChange={ handleChange }
        InputProps={ {
          classes: {
            inputMultiline: InputInputMultilineClassName,
            ...InputPropsRestClasses,
          },
          ...rest_InputProps,
        } }
        inputProps={ {
          spellCheck: spellCheck ?? false,
          ...restInputProps,
        } }
        { ...restProps }
      />
    </div>
  )
}

export default CodeField
