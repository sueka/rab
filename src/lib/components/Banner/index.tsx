import { AvatarProps } from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Bowser from 'bowser'
import React from 'react'

import Spacer from '~/lib/components/Spacer'

export interface Props {
  leading?: React.ReactElement<AvatarProps, React.ComponentType<AvatarProps>>
  text: React.ReactNode
  actions: React.ReactNode
}

// TODO: Remove
// TODO: Detect UA changes?
const browser = Bowser.getParser(navigator.userAgent)

const isMobile = browser.is('Mobile')

const Banner: React.FC<Props> = ({ leading, text, actions }) => (
  <Paper square elevation={ 0 }>
    <Box
      display="flex"
      alignItems="center"
      flexWrap="wrap"
      gridColumnGap={ (isMobile ? 36 : 90) - (isMobile ? 10 : 8) }
      gridRowGap={ (leading !== undefined ? 20 : 12) - (isMobile ? 10 : 8) }
    >
      <Box
        my={ isMobile ? 3 : 2 }
        ml={ leading !== undefined ? 2 : undefined }
        display="flex"
        alignItems={ isMobile ? 'flex-start' : 'center' }
      >
        { leading }
        <Box
          mx={ isMobile ? 2 : 3 } // TODO: Set 2 if not mobile & text has no line-breaks
        >
          <Typography variant="body2">{ text }</Typography>{ /* TODO: Align to baseline */ }
        </Box>
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
          alignItems="flex-end"
          justifyContent="flex-end"
          gridColumnGap={ 8 }
        >
          { actions }
        </Box>
      </Box>
    </Box>
  </Paper>
)

export default Banner
