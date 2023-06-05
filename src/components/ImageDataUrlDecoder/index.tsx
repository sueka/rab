import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import React, { useCallback, useState } from 'react'

const ImageDataUrlDecoder: React.FC = () => {
  const [dataUrl, setDataUrl] = useState<string>()

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    setDataUrl(event.currentTarget.value)
  }, [])

  return (
    <Grid container spacing={ 2 }>
      <Grid item xs={ 12 } sm={ 6 }>
        <TextField
          fullWidth
          multiline
          maxRows={ 10 }
          onChange={ handleChange }
          placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAAAAAA6fptVAAAADUlEQVQIHQECAP3/AP8BAQEA02HOTAAAAABJRU5ErkJggg=="
          dir="ltr"
          // inputProps={ { dir: 'ltr' } }
        />
      </Grid>
      <Grid item xs={ 12 } sm={ 6 }>
        <img src={ dataUrl } />
      </Grid>
    </Grid>
  )
}

export default ImageDataUrlDecoder
