import React, { useMemo, useState, useCallback, useRef } from 'react'
import { FormattedMessage } from 'react-intl'
import classnames from 'classnames'

import Button from '@material-ui/core/Button'

import cssClasses from './classes.css'
import messages from './messages'

interface Props {
  multiple?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  buttonLabel?: React.ReactNode
  resultMessageFormatter?(fileNames: string[]): React.ReactNode
  classes?: {
    root?: string
    button?: string
  }
  component?: React.ElementType<React.HTMLAttributes<HTMLElement>>
}

const FileUpload: React.FunctionComponent<Props> = ({
  multiple = false,
  onChange,
  buttonLabel = <FormattedMessage { ...messages.browse } />,
  resultMessageFormatter = (fileNames) => fileNames,
  classes: muiClasses,
  component = 'div',
}) => {
  const [files, setFiles] = useState<FileList | null>(null)

  const rootClassName = useMemo(() => classnames(muiClasses?.root, cssClasses.FileUpload), [muiClasses?.root, cssClasses.FileUpload])
  const buttonClassName = useMemo(() => classnames(muiClasses?.button, cssClasses.Button), [muiClasses?.button, cssClasses.Button])

  const resultMessage = useMemo(() => {
    if (files === null) {
      return <FormattedMessage { ...messages.noFileSelected } />
    }

    return resultMessageFormatter(Array.from(files, (file) => file.name))
  }, [resultMessageFormatter, files])

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
        multiple={ multiple }
        onChange={ handleInputChange }
        ref={ input }
      />
    </>
  ))
}

export default FileUpload
