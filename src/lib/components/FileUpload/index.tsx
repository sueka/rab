import classnames from 'classnames'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import Button, { ButtonProps } from '@material-ui/core/Button'

import cssClasses from './classes.css'
import messages from './messages'

interface Props extends Alt.Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className' | 'type' | 'onClick' | 'onChange'> {
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  buttonLabel?: React.ReactNode
  renderResultMessage?(fileNames: string[]): React.ReactNode
  classes?: {
    root?: string
    button?: string
  }
  component?: React.ElementType<React.HTMLAttributes<HTMLElement>>

  /**
   * Merges className, with mimicking Material-UI.
   */
  ButtonProps?: Alt.Omit<ButtonProps, 'onClick'>
}

const FileUpload: React.FunctionComponent<Props> = ({
  onClick,
  onChange,
  buttonLabel = <FormattedMessage { ...messages.browse } />,
  renderResultMessage = (fileNames) => fileNames,
  classes: muiClasses,
  component = 'div',
  ButtonProps,
  ...restInputProps
}) => {
  const [files, setFiles] = useState<FileList | null>(null)

  const rootClassName = useMemo(() => classnames(muiClasses?.root, cssClasses.FileUpload), [muiClasses?.root, cssClasses.FileUpload])
  const buttonClassName = useMemo(() => classnames(muiClasses?.button, cssClasses.Button, ButtonProps?.className), [muiClasses?.button, cssClasses.Button, ButtonProps?.className])

  const resultMessage = useMemo(() => {
    if (files === null) {
      return <FormattedMessage { ...messages.noFileSelected } />
    }

    return renderResultMessage(Array.from(files, (file) => file.name))
  }, [renderResultMessage, files])

  const input = useRef<HTMLInputElement>(null)

  const handleInputChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    onChange?.(event)
    setFiles(event.target.files)
  }, [onChange])

  const fireInputClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(() => {
    input.current?.dispatchEvent(new MouseEvent('click')) // FIXME: Element.click()
  }, [input])

  const handleButtonClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>((event) => {
    onClick?.(event)

    if (!event.isDefaultPrevented()) {
      fireInputClick(event)
    }
  }, [onClick])

  return React.createElement(component, {
    className: rootClassName,
  }, (
    <>
      <Button
        className={ buttonClassName }
        onClick={ handleButtonClick }
        { ...ButtonProps }
      >
        { buttonLabel }
      </Button>
      { resultMessage }
      <input
        className={ cssClasses.Input }
        type="file"
        onChange={ handleInputChange }
        ref={ input }
        { ...restInputProps }
      />
    </>
  ))
}

export default FileUpload
