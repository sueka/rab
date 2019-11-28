import React, { useMemo, useState, useCallback, useRef } from 'react'
import { FormattedMessage } from 'react-intl'
import classnames from 'classnames'

import Button from '@material-ui/core/Button'

import cssClasses from './classes.css'
import messages from './messages'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  buttonLabel?: React.ReactNode
  renderResultMessage?(fileNames: string[]): React.ReactNode
  classes?: {
    root?: string
    button?: string
  }
  component?: React.ElementType<React.HTMLAttributes<HTMLElement>>
}

const FileUpload: React.FunctionComponent<Props> = ({
  onChange,
  buttonLabel = <FormattedMessage { ...messages.browse } />,
  renderResultMessage = (fileNames) => fileNames,
  classes: muiClasses,
  component = 'div',
  ...restInputProps
}) => {
  const [files, setFiles] = useState<FileList | null>(null)

  const rootClassName = useMemo(() => classnames(muiClasses?.root, cssClasses.FileUpload), [muiClasses?.root, cssClasses.FileUpload])
  const buttonClassName = useMemo(() => classnames(muiClasses?.button, cssClasses.Button), [muiClasses?.button, cssClasses.Button])

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

  return React.createElement(component, {
    className: rootClassName,
  }, (
    <>
      <Button className={ buttonClassName } onClick={ fireInputClick }>
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
