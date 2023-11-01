import { atom } from 'recoil'

import { Props as BannerProps } from '~/components/Banner'

export type BannerElement = React.ReactElement<BannerProps, React.ComponentType<BannerProps>>

export interface Banner {
  banner: BannerElement
  key: string
  replaceable: boolean
}

const bannersState = atom<Banner[]>({
  key: 'banners',
  default: [],
})

export default bannersState
