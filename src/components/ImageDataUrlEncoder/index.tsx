import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { shouldBePresent } from '~/asserters/commonAsserters'
import FileUpload from '~/components/FileUpload'
import CopyTextButton from '~/components/CopyTextButton'
import messages from './messages'
import Grid from '@material-ui/core/Grid'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'

type CopiableTextFieldProps = TextFieldProps

const CopiableTextField: React.FC<CopiableTextFieldProps> = ({ value, ...restProps }) => {
  const input = useRef<HTMLInputElement>(null)

  return (
    <TextField
      value={ value }
      inputRef={ input }
      InputProps={ {
        endAdornment: (
          <InputAdornment position="end">
            <CopyTextButton inputFor={ input } />
          </InputAdornment>
        ),
      } }
      { ...restProps }
    />
  )
}

const ImageDataUrlEncoder: React.FC = () => {
  const [files, setFiles] = useState<FileList>()
  const [decoded, setDecoded] = useState<string>()
  const reader = useMemo(() => new FileReader, [])

  const handleReaderLoad = useCallback<NonNullable<FileReader['onload']>>((event) => {
    if (event.target?.result == null) {
      return
    }

    if (event.target.result instanceof ArrayBuffer) {
      throw new Error //
    }

    setDecoded(event.target?.result)
  }, [])

  useEffect(() => {
    reader.addEventListener('load', handleReaderLoad)

    return () => {
      reader.removeEventListener('load', handleReaderLoad)
    }
  }, [reader, handleReaderLoad])

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    setFiles(event.target.files ?? undefined)

    /// files[0] を Image に変換する
    if (event.target.files === null || event.target.files.length === 0) {
      return // do nothing
    }

    shouldBePresent(event.target.files[0])

    const file = event.target.files[0]

    reader.readAsDataURL(file)
  }, [reader])

  const resultMessage = useMemo(() => {
    if (files === undefined || files.length === 0) {
      return <FormattedMessage { ...messages.noFileSelected } />
    }

    if (decoded === undefined) {
      return <FormattedMessage { ...messages.encoding } />
    }

    return <FormattedMessage { ...messages.encodedSuccessfully } />
  }, [files, decoded])

  return (
    <Grid container spacing={ 2 }>
      <Grid item xs={ 12 } sm={ 6 }>
        <FileUpload
          accept="image/*"
          resultMessage={ resultMessage }
          onChange={ handleChange }
        />
      </Grid>
      <Grid item xs={ 12 } sm={ 6 }>
        <CopiableTextField
          multiline
          fullWidth
          maxRows={ 10 }
          value={ decoded ?? '' }
        />
      </Grid>
    </Grid>
  )
}

export default ImageDataUrlEncoder
