import InputAdornment from '@mui/material/InputAdornment'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import TextField from '@mui/material/TextField'
import { Theme, makeStyles } from '@mui/material/styles'
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import Helmet from 'react-helmet'
import { FormattedMessage, useIntl } from 'react-intl'

import CodeField from '~/components/CodeField'
import CopyTextButton from '~/components/CopyTextButton'
import FileUpload from '~/components/FileUpload'
import fileUploadMessages from '~/components/FileUpload/messages' // TODO
import MicSwitch, { Props as MicSwitchProps } from '~/components/MicSwitch'
import { createPage } from '~/components/PageTemplate'
import IntlProviderContext from '~/contexts/IntlProviderContext'
import useScreen from '~/hooks/useScreen'
import messages from './messages'
import { shouldBePresent } from '~/asserters/commonAsserters'

const CopiableTextField: React.FC = () => {
  const [text, setText] = useState('')
  const input = useRef<HTMLInputElement>(null)

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    setText(event.target.value)
  }, [])

  return (
    <TextField
      variant="standard"
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
  const scrollWidth = input.current?.scrollWidth
  const scrollHeight = input.current?.scrollHeight
  const offsetWidth = input.current?.offsetWidth
  const offsetHeight = input.current?.offsetHeight

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    setText(event.target.value)
  }, [])

  const handleResult = useCallback<MicSwitchProps['onResult']>((_event, value) => {
    if (input.current === null) {
      return
    }

    setText(value)

    shouldBePresent(scrollWidth)
    shouldBePresent(scrollHeight)
    shouldBePresent(offsetWidth)
    shouldBePresent(offsetHeight)

    input.current.scrollTop = scrollHeight - offsetHeight

    switch (dir) {
      case 'ltr':
        input.current.scrollLeft = scrollWidth - offsetWidth
        break
      case 'rtl':
        input.current.scrollLeft = -(scrollWidth - offsetWidth)
    }
  }, [
    dir,
    input,
    // To handle resizing, DOM updates, etc:
    scrollWidth,
    scrollHeight,
    offsetWidth,
    offsetHeight,
  ])

  return (
    <TextField
      variant="standard"
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
  const scrollWidth = input.current?.scrollWidth
  const scrollHeight = input.current?.scrollHeight
  const offsetWidth = input.current?.offsetWidth
  const offsetHeight = input.current?.offsetHeight

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    setText(event.target.value)
  }, [])

  const handleResult = useCallback<MicSwitchProps['onResult']>((_event, value) => {
    if (input.current === null) {
      return
    }

    setText(value)

    shouldBePresent(scrollWidth)
    shouldBePresent(scrollHeight)
    shouldBePresent(offsetWidth)
    shouldBePresent(offsetHeight)

    input.current.scrollTop = scrollHeight - offsetHeight

    switch (dir) {
      case 'ltr':
        input.current.scrollLeft = scrollWidth - offsetWidth
        break
      case 'rtl':
        input.current.scrollLeft = -(scrollWidth - offsetWidth)
    }
  }, [
    dir,
    input,
    // To handle resizing, DOM updates, etc:
    scrollWidth,
    scrollHeight,
    offsetWidth,
    offsetHeight,
  ])

  return (
    <TextField
      variant="standard"
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
  const [files, setFiles] = useState<File[] | null>(null)

  const handleFileUploadChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    setFiles(event.target.files !== null ? Array.from(event.target.files) : event.target.files)
  }, [])

  const resultMessage = useMemo(() => {
    if (files === null || files.length === 0) {
      return <FormattedMessage { ...fileUploadMessages.noFileSelected } />
    }

    return Array.from(files).map((file, i) => <ImageFile key={ i } file={ file } />)
  }, [files])

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
              resultMessage={ resultMessage }
              onChange={ handleFileUploadChange }
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
