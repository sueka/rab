import { atom } from 'recoil'

import { Props as BannerProps } from '~/lib/components/Banner'

type Banner = React.ReactElement<BannerProps, React.ComponentType<BannerProps>>

const bannerState = atom<Banner | null>({
  key: 'bannerState',
  default: null,
})

export default bannerState
