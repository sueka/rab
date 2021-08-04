import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles'
import classNames from 'classnames'
import React, { useEffect, useMemo, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import bannerOpenState from '~/atoms/bannerOpenState'
import { Banner } from '~/atoms/bannersState'
import delay from '~/delay'
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
  const [open, setOpen] = useRecoilState(bannerOpenState)
  const jssClasses = useStyles({ topAppbarHeight })
  const collapseContainerClassName = useMemo(() => classNames(jssClasses.CollapseContainer, classes.CollapseContainer), [jssClasses])
  const [bannerToShow, setBannerToShow] = useState<Banner | null>(null)
  const theme = useTheme()

  useEffect(() => {
    // tslint:disable-next-line:semicolon
    ;(async () => {
      if (currentBanner !== null) {

        // すでにバナーが表示されていて、別のバナーを表示しようとするときは、バナーを閉じる。
        if (bannerToShow !== null && currentBanner.key !== bannerToShow.key) {
          setOpen(false)
          await delay(theme.transitions.duration.standard) // TODO: Wait the transition well
        }

        setBannerToShow(currentBanner)
        setOpen(true)
      } else {
        setOpen(false)
        await delay(theme.transitions.duration.standard) // TODO: Wait the transition
        setBannerToShow(null)
      }
    })()
  }, [currentBanner, bannerToShow, theme])

  return (
    <Collapse
      in={ open }
      mountOnEnter
      unmountOnExit
      classes={ {
        root: collapseContainerClassName,
      } }
    >
      <div>
        { bannerToShow?.banner }
        <Divider />
      </div>
    </Collapse>
  )
}

export default BannerContainer
