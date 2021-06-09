import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'
import { Theme, makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { shouldBeNullish } from '~/asserters/commonAsserters'
import { BannerElement } from '~/atoms/bannersState'
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
  // const open = useRecoilValue(bannerOpenState)
  const jssClasses = useStyles({ topAppbarHeight })
  const collapseContainerClassName = useMemo(() => classNames(jssClasses.CollapseContainer, classes.CollapseContainer), [jssClasses])
  const [bannerToShow, setBannerToShow] = useState<BannerElement | null>(null)

  const handleExited = useCallback(() => {
    shouldBeNullish(currentBanner)

    setBannerToShow(null)
  }, [currentBanner])

  useEffect(() => {
    // currentBanner が null になったときは、 <Collapse in> が変更され、 onExited で setBannerToShow(null) が実行される。
    if (currentBanner !== null) {
      setBannerToShow(currentBanner.banner)
    }
  }, [currentBanner])

  return (
    <Collapse
      in={ currentBanner !== null }
      mountOnEnter
      unmountOnExit
      onExited={ handleExited }
      classes={ {
        container: collapseContainerClassName,
      } }
    >
      <div>
        { bannerToShow }
        <Divider />
      </div>
    </Collapse>
  )
}

export default BannerContainer
