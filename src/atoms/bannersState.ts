import { atom } from 'recoil'

import { Props as BannerProps } from '~/components/Banner'

export type BannerElement = React.ReactElement<BannerProps, React.ComponentType<BannerProps>>

export interface Banner {
  banner: BannerElement
}

const bannersState = atom<Banner[]>({
  key: 'bannersState',
  default: [],
})

export default bannersState
