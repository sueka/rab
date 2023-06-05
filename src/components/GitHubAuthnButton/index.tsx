import Button from '@mui/material/Button'
import React, { useCallback } from 'react'
import { FormattedMessage } from 'react-intl'
import { useDispatch } from 'react-redux'

import { redirectToGitHub } from '~/redux/modules/userAuthn'
import messages from './messages'

// TODO: delete
const GitHubAuthnButton: React.FC = () => {
  const dispatch = useDispatch()

  const handleClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(() => {
    dispatch(redirectToGitHub())
  }, [dispatch])

  return (
    <Button onClick={ handleClick }>
      <FormattedMessage { ...messages.authenticateAUserWithGitHub } / >
    </Button>
  )
}

export default GitHubAuthnButton
