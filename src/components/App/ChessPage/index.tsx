import React from 'react'
import Helmet from 'react-helmet'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { compose } from 'redux'

import Chessboard from '~/components/Chessboard'
import ChessContext from '~/contexts/ChessContext'
import { State } from '~/redux'
import { halfMove, pickChessman, releaseChessman } from '~/redux/modules/chess'
import { createPage } from '~/templates/PageTemplate'
import messages from './messages'

const ChessPage: React.FunctionComponent = () => {
  const { formatMessage } = useIntl()

  const picking = useSelector((state: State) => state.chess.picking)
  const targets = useSelector((state: State) => state.chess.targets)

  const dispatch = useDispatch()

  return (
    <>
      <Helmet title={ formatMessage(messages.chess) } />
      <ChessContext.Provider
        value={ {
          picking,
          targets,
          halfMove: compose(dispatch, halfMove),
          pickChessman: compose(dispatch, pickChessman),
          releaseChessman: compose(dispatch, releaseChessman),
        } }
      >
        <Chessboard />
      </ChessContext.Provider>
    </>
  )
}

export default createPage(ChessPage)
