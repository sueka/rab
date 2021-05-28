import { useRecoilCallback } from 'recoil'

import bannerOpenState from '~/atoms/bannerOpenState'
import bannerState from '~/atoms/bannerState'
import { Props as BannerProps } from '~/lib/components/Banner'

type Banner = React.ReactElement<BannerProps, React.ComponentType<BannerProps>>

const useBanner = () => {
  const show = useRecoilCallback(({ set }) => (banner: Banner) => {

    set(bannerState, banner)

    set(bannerOpenState, true)
  }, [])

  const hide = useRecoilCallback(({ set }) => () => {
    set(bannerOpenState, false)
  }, [])

  return { show, hide }
}

export default useBanner
