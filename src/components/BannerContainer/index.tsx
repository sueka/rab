import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'
import { Theme, makeStyles, useTheme } from '@mui/material/styles'
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

const useStyles = makeStyles<Theme, StyleProps, 'Collapse'>({
  Collapse: {
    top: ({ topAppbarHeight }) => topAppbarHeight,
  },
})

const BannerContainer: React.FC<Props> = ({ topAppbarHeight }) => {
  const currentBanner = useRecoilValue(currentBannerState)
  const [open, setOpen] = useRecoilState(bannerOpenState)
  const jssClasses = useStyles({ topAppbarHeight })
  const collapseClassName = useMemo(() => classNames(jssClasses.Collapse, classes.Collapse), [jssClasses])
  const [bannerToShow, setBannerToShow] = useState<Banner | null>(null)
  const theme = useTheme()

  useEffect(() => {
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
  }, [currentBanner, bannerToShow, theme, setOpen])

  return (
    <Collapse
      in={ open }
      mountOnEnter
      unmountOnExit
      classes={ {
        root: collapseClassName,
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
