import { AvatarProps } from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Bowser from 'bowser'
import React from 'react'

import Spacer from '~/components/Spacer'

export interface Props {
  leading?: React.ReactElement<AvatarProps, React.ComponentType<AvatarProps>>
  text: React.ReactNode
  actions: React.ReactNode
}

// TODO: Remove
// TODO: Detect UA changes?
const browser = Bowser.getParser(navigator.userAgent)

const isMobile = browser.is('Mobile')

/**
 * An implementation of https://material.io/components/banners.
 *
 * NOTE: Not support the no leading, mobile, one-line version.
 */
const Banner: React.FC<Props> = ({ leading, text, actions }) => (
  <Paper square elevation={ 0 }>
    <Box
      display="flex"
      flexWrap="nowrap"
      alignItems={ isMobile ? 'flex-start' : 'center' }
    >
      { leading !== undefined && (
        <Box
          my={ isMobile ? 3 : 2 }
          ml={ 2 }
        >
          { leading }
        </Box>
      ) }
      <Box
        alignSelf="stretch"
        display="flex"
        flexGrow={ 1 }
        alignItems={ isMobile ? 'flex-start' : 'center' }
        flexWrap={ isMobile ? 'wrap' : undefined }
        gridColumnGap={ (isMobile ? 36 : 90) - 16 }
        gridRowGap={ isMobile ? (leading !== undefined ? 20 : 12) - 10 : undefined }
      >
        <Box
          mt={ isMobile ? 3 : 2 }
          mb={ isMobile ? undefined : 2 }
          ml={ isMobile ? 2 : 3 }
          mr={ 1 }
        >
          <Typography variant="body2">{ text }</Typography>{ /* TODO: Align to baseline */ }
        </Box>
        <Box
          alignSelf="flex-end"
          display="flex"
          flexGrow={ 1 }
        >
          <Spacer />
          <Box
            mt={ isMobile ? 1.25 : 1 }
            mx={ 1 }
            mb={ 1 }
            display="flex"
            gridColumnGap={ 8 }
          >
            { actions }
          </Box>
        </Box>
      </Box>
    </Box>
  </Paper>
)

export default Banner
