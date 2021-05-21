import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import { Theme, makeStyles } from '@material-ui/core/styles'
import React, { useCallback, useState } from 'react'
import { useRecoilState } from 'recoil'

import bannerState from '~/atoms/bannerState'
import useScreen from '~/lib/hooks/useScreen'
import classes from './classes.css'

interface StyleProps {
  bannerHeight?: number // including <Divider>
}

const useStyles = makeStyles<Theme, StyleProps, 'Offset'>({
  Offset: {
    height: ({ bannerHeight }) => bannerHeight,
  },
})

// TODO: Animate; See https://material.io/components/banners#behavior
const BannerContainer: React.FC = () => {
  const { width: screenWidth } = useScreen()
  const [banner] = useRecoilState(bannerState)
  const [height, setHeight] = useState<number | null>(null)
  const jssClasses = useStyles({ bannerHeight: height ?? undefined })

  const ref = useCallback<React.RefCallback<HTMLDivElement>>((node) => {
    // To silence the ESLint rule react-hooks/exhaustive-deps
    if (screenWidth === null) {
      return
    }

    const rect = node?.getBoundingClientRect()

    if (rect === undefined) {
      return
    }

    setHeight(rect.height)
  }, [screenWidth])

  if (banner === null) {
    return null
  }

  return (
    <>
      <Box position="fixed" width="100%" className={ classes.BannerContainer }>
        <div ref={ ref }>
          { banner }
          <Divider />
        </div>
      </Box>
      <div className={ jssClasses.Offset } />
    </>
  )
}

export default BannerContainer
