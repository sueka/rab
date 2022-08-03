import InputAdornment from '@material-ui/core/InputAdornment'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import TextField from '@material-ui/core/TextField'
import { Theme, makeStyles } from '@material-ui/core/styles'
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import Helmet from 'react-helmet'
import { FormattedMessage, useIntl } from 'react-intl'

import CodeField from '~/components/CodeField'
import CopyTextButton from '~/components/CopyTextButton'
import FileUpload, { Props as FileUploadProps } from '~/components/FileUpload'
import fileUploadMessages from '~/components/FileUpload/messages' // TODO
import MicSwitch, { Props as MicSwitchProps } from '~/components/MicSwitch'
import { createPage } from '~/components/PageTemplate'
import IntlProviderContext from '~/contexts/IntlProviderContext'
import useScreen from '~/hooks/useScreen'
import messages from './messages'

const CopiableTextField: React.FC = () => {
  const [text, setText] = useState('')
  const input = useRef<HTMLInputElement>(null)

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    setText(event.target.value)
  }, [])

  return (
    <TextField
      label="label"
      value={ text }
      onChange={ handleChange }
      inputRef={ input }
      InputProps={ {
        endAdornment: (
          <InputAdornment position="end">
            <CopyTextButton inputFor={ input } />
          </InputAdornment>
        ),
      } }
    />
  )
}

const MicIncludedTextField: React.FC = () => {
  const { dir } = useContext(IntlProviderContext)
  const [text, setText] = useState('')
  const input = useRef<HTMLInputElement>(null)

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    setText(event.target.value)
  }, [])

  const handleResult = useCallback<MicSwitchProps['onResult']>((_event, value) => {
    if (input.current === null) {
      return
    }

    setText(value)

    input.current.scrollTop = input.current.scrollHeight - input.current.offsetHeight

    switch (dir) {
      case 'ltr':
        input.current.scrollLeft = input.current.scrollWidth - input.current.offsetWidth
        break
      case 'rtl':
        input.current.scrollLeft = -(input.current.scrollWidth - input.current.offsetWidth)
    }
  }, [
    dir,
    input,
    // To handle resizing, DOM updates, etc:
    input.current?.scrollWidth,
    input.current?.scrollHeight,
    input.current?.offsetWidth,
    input.current?.offsetHeight,
  ])

  return (
    <TextField
      label="label"
      value={ text }
      onChange={ handleChange }
      inputRef={ input }
      InputProps={ {
        endAdornment: (
          <InputAdornment position="end">
            <MicSwitch
              inputFor={ input }
              onResult={ handleResult }
              fallback={ null }
            />
          </InputAdornment>
        ),
      } }
    />
  )
}

const MicIncludedCopiableTextField: React.FC = () => {
  const { dir } = useContext(IntlProviderContext)
  const [text, setText] = useState('')
  const input = useRef<HTMLInputElement>(null)

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    setText(event.target.value)
  }, [])

  const handleResult = useCallback<MicSwitchProps['onResult']>((_event, value) => {
    if (input.current === null) {
      return
    }

    setText(value)

    input.current.scrollTop = input.current.scrollHeight - input.current.offsetHeight

    switch (dir) {
      case 'ltr':
        input.current.scrollLeft = input.current.scrollWidth - input.current.offsetWidth
        break
      case 'rtl':
        input.current.scrollLeft = -(input.current.scrollWidth - input.current.offsetWidth)
    }
  }, [
    dir,
    input,
    // To handle resizing, DOM updates, etc:
    input.current?.scrollWidth,
    input.current?.scrollHeight,
    input.current?.offsetWidth,
    input.current?.offsetHeight,
  ])

  return (
    <TextField
      label="label"
      value={ text }
      onChange={ handleChange }
      inputRef={ input }
      InputProps={ {
        endAdornment: (
          <InputAdornment position="end">
            <MicSwitch
              inputFor={ input }
              onResult={ handleResult }
              fallback={ null }
            />
            <CopyTextButton inputFor={ input } />
          </InputAdornment>
        ),
      } }
    />
  )
}

interface ImageFileProps {
  file: File
}

interface StyleProps {
  width: number | null
  height: number | null
}

const useStyles = makeStyles<Theme, StyleProps, 'Image'>({
  Image: {
    maxWidth: ({ width }) => width !== null ? width / 2 : undefined,
    maxHeight: ({ height }) => height !== null ? height / 2 : undefined,
  },
})

const ImageFile: React.FC<ImageFileProps> = ({ file }) => {
  const [src, setSrc] = useState<string | null>(null)
  const reader = useMemo(() => new FileReader, [])
  const { width, height } = useScreen()
  const jssClasses = useStyles({ width, height })

  const handleReaderLoad = useCallback<NonNullable<FileReader['onload']>>((event) => {
    if (event.target?.result == null) {
      return
    }

    if (event.target.result instanceof ArrayBuffer) {
      throw new Error //
    }

    setSrc(event.target.result)
  }, [])

  useEffect(() => {
    reader.addEventListener('load', handleReaderLoad)

    return () => {
      reader.removeEventListener('load', handleReaderLoad)
    }
  }, [reader, handleReaderLoad])

  useEffect(() => {
    if (!/^image\/[0-9A-Za-z][!#$&+-.0-9A-Z^_a-z]*$/.test(file.type)) {
      throw new Error
    }

    reader.readAsDataURL(file)
  }, [file, reader])

  return (
    <img src={ src ?? undefined } className={ jssClasses.Image } />
  )
}

const FormControlsPage: React.FC = () => {
  const { formatMessage } = useIntl()

  const renderResult = useCallback<Required<FileUploadProps>['renderResultMessage']>((files) => {
    if (files === null || files.length === 0) {
      return <FormattedMessage { ...fileUploadMessages.noFileSelected } />
    }

    return Array.from(files).map((file, i) => <ImageFile key={ i } file={ file } />)
  }, [])

  const [code, setCode] = useState('')

  const handleCodeFieldChange = useCallback<React.ChangeEventHandler<HTMLTextAreaElement>>((event) => {
    setCode(event.target?.value)
  }, [])

  const codeFieldInput = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  return (
    <>
      <Helmet title={ formatMessage(messages.formControls) } />
      <List>
        <ListItem>
          <ListItemText>
            <FileUpload
              accept="image/*"
              multiple
              renderResultMessage={ renderResult }
            />
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            <CopiableTextField />
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            <MicIncludedTextField />
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            <MicIncludedCopiableTextField />
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            <CodeField
              label="code"
              value={ code }
              onChange={ handleCodeFieldChange }
              InputProps={ {
                endAdornment: (
                  <InputAdornment position="end">
                    <CopyTextButton inputFor={ codeFieldInput } />
                  </InputAdornment>
                ),
              } }
              inputProps={ {
                ref: codeFieldInput,
              } }
            />
          </ListItemText>
        </ListItem>
      </List>
    </>
  )
}

export default createPage(FormControlsPage)
