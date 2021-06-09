import assert from 'assert'
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
  set({ get, set }, newCurrentBanner) {
    if (newCurrentBanner instanceof DefaultValue) {
      throw new Error('DefaultValue not supported.')
    }

    set(bannersState, (banners) => {
      if (newCurrentBanner === null) {
        const [_firstBanner, ...restBanners] = banners

        return restBanners
      } else {
        const oldCurrentBanner = get(currentBannerState)

        // TODO: Use `do` expression: https://github.com/tc39/proposal-do-expressions
        const bannersWOCurrentReplaceable = (() => {
          if (oldCurrentBanner !== null && oldCurrentBanner.replaceable) {
            const i = banners.findIndex((banner) => banner.key === oldCurrentBanner.key)

            assert(i === 0)

            return [
              ...banners.slice(0, i),
              ...banners.slice(i + 1),
            ]
          } else {
            return banners
          }
        })()

        const i = bannersWOCurrentReplaceable.findIndex((banner) => banner.key === newCurrentBanner.key)

        if (i !== -1) {
          return [
            newCurrentBanner,
            ...bannersWOCurrentReplaceable.slice(0, i),
            ...bannersWOCurrentReplaceable.slice(i + 1),
          ]
        } else {
          return [newCurrentBanner, ...bannersWOCurrentReplaceable]
        }
      }
    })
  }
})

export default currentBannerState
