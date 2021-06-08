import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'
import { Theme, makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import React, { useMemo } from 'react'
import { useRecoilCallback, useRecoilValue } from 'recoil'

import bannerOpenState from '~/atoms/bannerOpenState'
import bannersState from '~/atoms/bannersState'
import currentBannerState from '~/selectors/currentBannerState'
import classes from './classes.css'

interface Props {
  topAppbarHeight?: number
}

interface StyleProps {
  topAppbarHeight?: number
}

const useStyles = makeStyles<Theme, StyleProps, 'CollapseContainer'>({
  CollapseContainer: {
    top: ({ topAppbarHeight }) => topAppbarHeight,
  },
})

const BannerContainer: React.FC<Props> = ({ topAppbarHeight }) => {
  const currentBanner = useRecoilValue(currentBannerState)
  const open = useRecoilValue(bannerOpenState)
  const jssClasses = useStyles({ topAppbarHeight })
  const collapseContainerClassName = useMemo(() => classNames(jssClasses.CollapseContainer, classes.CollapseContainer), [jssClasses])

  const handleExited = useRecoilCallback(({ set }) => () => {
    set(currentBannerState, null)
  })

  return (
    <Collapse
      in={ open }
      mountOnEnter
      unmountOnExit
      onExited={ handleExited }
      classes={ {
        container: collapseContainerClassName,
      } }
    >
      <div>
        { currentBanner?.banner }
        <Divider />
      </div>
    </Collapse>
  )
}

export default BannerContainer
