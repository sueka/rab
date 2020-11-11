import Button, { ButtonProps } from '@material-ui/core/Button'
import FormLabel from '@material-ui/core/FormLabel'
import classnames from 'classnames'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import cssClasses from './classes.css'
import messages from './messages'

interface Props extends Alt.Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onClick' | 'onChange'> {
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  buttonLabel?: React.ReactNode
  renderResultMessage?(files: File[] | null): React.ReactNode
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

const FileUpload: React.FC<Props> = ({
  className,
  disabled,
  multiple,
  onClick,
  onChange,
  buttonLabel = <FormattedMessage { ...messages.browse } />,
  renderResultMessage = (fs) => {
    if (fs === null) {
      return <FormattedMessage { ...messages.noFileSelected } />
    }

    switch (fs.length) {
      case 1:
        return fs[0].name
      default:
        return <FormattedMessage { ...messages.nFilesSelected } values={ { n: fs.length } } />
    }
  },
  classes: propClasses,
  component: Component = FormLabel,
  ButtonProps,
  ...restInputProps
}: Props) => {
  const [files, setFiles] = useState<File[] | null>(null) // NOTE: (event: ChangeEvent).target.files をそのまま使うと参照が変わらないので re-render されない。

  const rootClassName = useMemo(() => classnames(className, propClasses?.root, cssClasses.FileUpload), [className, propClasses?.root])
  const buttonClassName = useMemo(() => classnames(propClasses?.button, cssClasses.Button, ButtonProps?.className), [propClasses?.button, ButtonProps?.className])

  const resultMessage = useMemo(() => renderResultMessage(files), [renderResultMessage, files])

  const input = useRef<HTMLInputElement>(null)

  const handleInputChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    onChange?.(event)
    setFiles(event.target.files !== null ? Array.from(event.target.files) : event.target.files)
  }, [onChange])

  const fireInputClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(() => {
    input.current?.dispatchEvent(new MouseEvent('click')) // FIXME: Element.click()
  }, [input])

  const handleButtonClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>((event) => {
    onClick?.(event)

    if (!event.isDefaultPrevented()) {
      fireInputClick(event)
    }
  }, [onClick, fireInputClick])

  return (
    <Component className={ rootClassName }>
      <Button
        disabled={ disabled }
        onClick={ handleButtonClick }
        { ...ButtonProps }
        className={ buttonClassName } // NOTE: Overrides ButtonProps.className
      >
        { buttonLabel }
      </Button>
      { resultMessage }
      <input
        className={ cssClasses.Input }
        type="file"
        disabled={ disabled }
        multiple={ multiple }
        onChange={ handleInputChange }
        ref={ input }
        { ...restInputProps }
      />
    </Component>
  )
}

export default FileUpload
