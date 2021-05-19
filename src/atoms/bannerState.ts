import { atom } from 'recoil'

import { Props as BannerProps } from '~/lib/components/Banner'

const bannerState = atom<React.ReactElement<BannerProps, React.ComponentType<BannerProps>> | null>({
  key: 'bannerState',
  default: null,
})

export default bannerState
