import { useRecoilCallback } from 'recoil'

import bannerOpenState from '~/atoms/bannerOpenState'
import { Props as BannerProps } from '~/components/Banner'
import currentBannerState from '~/selectors/currentBannerState'

type BannerElement = React.ReactElement<BannerProps, React.ComponentType<BannerProps>>

const useBanner = () => {
  const show = useRecoilCallback(({ set }) => (banner: BannerElement) => {
    set(currentBannerState, {
      banner,
    })

    set(bannerOpenState, true)
  }, [])

  const hide = useRecoilCallback(({ set }) => () => {
    set(bannerOpenState, false)
  }, [])

  return { show, hide }
}

export default useBanner
