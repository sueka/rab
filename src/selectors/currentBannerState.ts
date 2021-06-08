import { DefaultValue, selector } from 'recoil'

import bannersState, { Banner } from '~/atoms/bannersState'

const currentBannerState = selector<Banner | null>({
  key: 'currentBannerState',
  get({ get }) {
    const banners = get(bannersState)

    if (banners.length >= 1) {
      return banners[0]
    } else {
      return null
    }
  },
  set({ set }, newCurrentBanner) {
    if (newCurrentBanner instanceof DefaultValue) {
      throw new Error('DefaultValue not supported.')
    }

    set(bannersState, (banners) => {
      if (newCurrentBanner === null) {
        const [_firstBanner, ...restBanners] = banners

        return restBanners
      } else {
        return [newCurrentBanner, ...banners]
      }
    })
  }
})

export default currentBannerState
