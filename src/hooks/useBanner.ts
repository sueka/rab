import { useRecoilCallback } from 'recoil'

import bannerOpenState from '~/atoms/bannerOpenState'
import bannersState from '~/atoms/bannersState'
import { Props as BannerProps } from '~/components/Banner'

type BannerElement = React.ReactElement<BannerProps, React.ComponentType<BannerProps>>

const useBanner = () => {
  const show = useRecoilCallback(({ set }) => (banner: BannerElement) => {
    set(bannersState, [{
      banner,
    }])

    set(bannerOpenState, true)
  }, [])

  const hide = useRecoilCallback(({ set }) => () => {
    set(bannerOpenState, false)
  }, [])

  return { show, hide }
}

export default useBanner
