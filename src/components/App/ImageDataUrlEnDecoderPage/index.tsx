import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import React from 'react'
import Helmet from 'react-helmet'
import { FormattedMessage, useIntl } from 'react-intl'

import { createPage } from '~/components/PageTemplate'
import ImageDataUrlDecoder from '~/components/ImageDataUrlDecoder'
import ImageDataUrlEncoder from '~/components/ImageDataUrlEncoder'
import messages from './messages'

const ImageDataUrlEnDecoderPage: React.FC = () => {
  const { formatMessage } = useIntl()

  return (
    <>
      <Helmet title={ formatMessage(messages.imageDataUrlEnDecoder) } />
      <Box>
        <Box padding={ 2 }>
          <Grid container spacing={ 2 }>
            <Grid item xs={ 12 }>
              <Typography variant="h3">
                <FormattedMessage { ...messages.encoder } />
              </Typography>
            </Grid>
            <Grid item xs={ 12 }>
              <ImageDataUrlEncoder />
            </Grid>
          </Grid>
        </Box>
        <Box padding={ 2 }>
          <Grid container spacing={ 2 }>
            <Grid item xs={ 12 }>
              <Typography variant="h3">
                <FormattedMessage { ...messages.decoder } />
              </Typography>
            </Grid>
            <Grid item xs={ 12 }>
              <ImageDataUrlDecoder />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  )
}

export default createPage(ImageDataUrlEnDecoderPage)
