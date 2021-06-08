import { useRecoilCallback } from 'recoil'

import { Props as BannerProps } from '~/components/Banner'
import currentBannerState from '~/selectors/currentBannerState'

type BannerElement = React.ReactElement<BannerProps, React.ComponentType<BannerProps>>

const useBanner = () => {
  const show = useRecoilCallback(({ set }) => (banner: BannerElement) => {
    set(currentBannerState, {
      banner,
    })
  }, [])

  const hide = useRecoilCallback(({ set }) => () => {
    set(currentBannerState, null)
  }, [])

  return { show, hide }
}

export default useBanner
