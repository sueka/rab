import Slide, { SlideProps } from '@material-ui/core/Slide'
import { SnackbarProvider as OriginalSnackbarProvider, SnackbarProviderProps } from 'notistack'
import React, { useContext, useMemo } from 'react'

import { shouldBePresent } from '~/asserters/commonAsserters'
import IntlProviderContext from '~/contexts/IntlProviderContext'

type TransitionProps = Alt.Omit<SlideProps, 'direction'>

type Props =
  & Alt.Omit<SnackbarProviderProps, 'TransitionComponent'>

const RightSlide: React.FC<TransitionProps> = (props) => <Slide { ...props } direction="right" />
const LeftSlide: React.FC<TransitionProps> = (props) => <Slide { ...props } direction="left" />

const SnackbarProvider: React.FC<Props> = (props) => {
  const { dir } = useContext(IntlProviderContext)

  const transition = useMemo(() => {
    shouldBePresent(dir)

    switch (dir) {
      case 'ltr': return RightSlide
      case 'rtl': return LeftSlide
    }
  }, [dir])

  return (
    // NOTE: notistack は `dir="rtl"` を見付けると `anchorOrigin.horizontal` を反転させると思われる。また、 `Slide` の向きは `anchorOrigin` によって選択される。このため、 `anchorOrigin.horizontal` を `dir` から計算すると、水平位置は左に固定される。 `anchorOrigin.horizontal: 'left'` とすれば、水平位置は正しくなるが、 `Slide` は右向きになる。
   <OriginalSnackbarProvider
      TransitionComponent={ transition }
      { ...props }
    />
  )
}

export default SnackbarProvider
