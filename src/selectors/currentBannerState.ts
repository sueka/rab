import { selector } from 'recoil'

import bannersState from '~/atoms/bannersState'

const currentBannerState = selector({
  key: 'currentBannerState',
  get({ get }) {
    const banners = get(bannersState)

    if (banners.length >= 1) {
      return banners[0]
    } else {
      return
    }
  },
})

export default currentBannerState
