import Button, { ButtonProps } from '@material-ui/core/Button'
import FormLabel from '@material-ui/core/FormLabel'
import Bowser from 'bowser'
import classnames from 'classnames'
import React, { useCallback, useMemo, useRef } from 'react'
import { FormattedMessage } from 'react-intl'

import { shouldBePresent } from '~/asserters/commonAsserters'
import cssClasses from './classes.css'
import messages from './messages'

export interface Props extends Alt.Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onClick' | 'onChange'> {
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  buttonLabel?: React.ReactNode
  resultMessage?: React.ReactNode
  classes?: {
    root?: string
    button?: string
  }
  component?: React.ElementType

  /**
   * Merges className, with mimicking Material-UI.
   */
  ButtonProps?: Alt.Omit<ButtonProps, 'disabled' | 'onClick'>
}

// TODO: Remove?
const browser = Bowser.getParser(navigator.userAgent)

const isSafari = browser.is('Safari')

const FileUpload: React.FC<Props> = ({
  className,
  disabled,
  multiple,
  onClick,
  onChange,
  buttonLabel = <FormattedMessage { ...messages.browse } />,
  resultMessage,
  classes: propClasses,
  component: Component = FormLabel,
  ButtonProps,
  ...restInputProps
}: Props) => {
  const rootClassName = useMemo(() => classnames(className, propClasses?.root, cssClasses.FileUpload, {
    [cssClasses.Safari]: isSafari,
  }), [className, propClasses?.root])
  const buttonClassName = useMemo(() => classnames(propClasses?.button, cssClasses.Button, ButtonProps?.className), [propClasses?.button, ButtonProps?.className])

  const input = useRef<HTMLInputElement>(null)

  const defaultResultMessage = useMemo(() => {
    if (resultMessage != null) {
      return // nothing
    }

    if (input.current?.files == null || input.current?.files.length === 0) {
      return <FormattedMessage { ...messages.noFileSelected } />
    }

    switch (input.current?.files.length) {
      case 1:
        return input.current?.files[0]!.name
      default:
        return <FormattedMessage { ...messages.nFilesSelected } values={ { n: input.current?.files.length } } />
    }
  }, [resultMessage, input.current?.files ?? null])

  const fireInputClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(() => {
    shouldBePresent(input.current)

    input.current.dispatchEvent(new MouseEvent('click')) // FIXME: Element.click()
  }, [input])

  const handleButtonClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>((event) => {
    onClick?.(event)

    if (!event.isDefaultPrevented()) {
      fireInputClick(event)
    }
  }, [onClick, fireInputClick])

  return (
    <Component className={ rootClassName } tabIndex={ isSafari ? -1 : 0 }>
      <Button
        disabled={ disabled }
        onClick={ handleButtonClick }
        { ...ButtonProps }
        className={ buttonClassName } // NOTE: Overrides ButtonProps.className
        tabIndex={ -1 }
      >
        { buttonLabel }
      </Button>
      { resultMessage ?? defaultResultMessage }
      <input
        className={ cssClasses.Input }
        type="file"
        disabled={ disabled }
        multiple={ multiple }
        onChange={ onChange }
        ref={ input }
        { ...restInputProps }
      />
    </Component>
  )
}

export default FileUpload
