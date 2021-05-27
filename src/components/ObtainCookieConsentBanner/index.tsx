import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import SecurityIcon from '@material-ui/icons/Security'
import React from 'react'
import { FormattedMessage } from 'react-intl'

import Banner from '~/lib/components/Banner'
import messages from './messages'

interface Props {
  onAgree?(): void
  onCancel?(): void
}

const ObtainCookieConsentBanner: React.FC<Props> = ({ onAgree, onCancel }) => (
  <Banner
    leading={ <Avatar>
      <SecurityIcon />
    </Avatar> }
    text={ <FormattedMessage { ...messages.weUseCookiesToAnalyzeOurTraffic } /> }
    actions={ <>
      <Button variant="text" color="primary" onClick={ onAgree }>
        <FormattedMessage { ...messages.agree } />
      </Button>
      <Button variant="text" color="primary" onClick={ onCancel }>
        <FormattedMessage { ...messages.cancel } />
      </Button>
    </> }
  />
)

export default ObtainCookieConsentBanner
