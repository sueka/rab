import { useRecoilCallback } from 'recoil'
import { v4 } from 'uuid'

import bannersState from '~/atoms/bannersState'
import { Props as BannerProps } from '~/components/Banner'
import currentBannerState from '~/selectors/currentBannerState'

type BannerElement = React.ReactElement<BannerProps, React.ComponentType<BannerProps>>

interface ShowOptions {
  key?: string
  replaceable?: boolean
}

interface HideOptions {
  key?: string
  safe?: boolean // no failures if true
}

const useBanner = () => {
  const show = useRecoilCallback(({ set }) => (banner: BannerElement, options?: ShowOptions) => {
    const key = options?.key ?? v4()
    const replaceable = options?.replaceable ?? false

    set(currentBannerState, {
      banner,
      key,
      replaceable,
    })

    return key
  })

  const hide = useRecoilCallback(({ set }) => (options?: HideOptions) => {
    const key = options?.key
    const safe = options?.safe ?? false

    if (key === undefined) {
      set(currentBannerState, (currentBanner) => {
        if (currentBanner === null && !safe) {
          throw new Error('No banner found.')
        }

        return null
      })
    } else {
      set(bannersState, (banners) => {
        const i = banners.findIndex((banner) => banner.key === key)

        if (i === -1 && !safe) {
          throw new Error('No banner found.')
        }

        if (i !== -1) {
          return [
            ...banners.slice(0, i),
            ...banners.slice(i + 1),
          ]
        }

        return banners
      })
    }
  })

  return { show, hide }
}

export default useBanner
