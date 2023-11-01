import { DefaultValue, selector } from 'recoil'

import bannersState, { Banner } from '~/atoms/bannersState'

const currentBannerState = selector<Banner | null>({
  key: 'currentBanner',
  get({ get }) {
    const banners = get(bannersState)
    return banners[0] ?? null
  },
  set({ get, set }, newCurrentBanner) {
    if (newCurrentBanner instanceof DefaultValue) {
      throw new Error('DefaultValue not supported.')
    }

    set(bannersState, (banners) => {
      if (newCurrentBanner === null) {
        const [_firstBanner, ...restBanners] = banners

        return restBanners
      } else {
        const currentBanner = get(currentBannerState)
        const bannersWoCurrentReplaceable = currentBanner !== null && currentBanner.replaceable ? banners.slice(1) : banners

        const i = bannersWoCurrentReplaceable.findIndex((banner) => banner.key === newCurrentBanner.key)

        if (i !== -1) {
          return [
            newCurrentBanner,
            ...bannersWoCurrentReplaceable.slice(0, i),
            ...bannersWoCurrentReplaceable.slice(i + 1),
          ]
        } else {
          return [newCurrentBanner, ...bannersWoCurrentReplaceable]
        }
      }
    })
  },
})

export default currentBannerState
