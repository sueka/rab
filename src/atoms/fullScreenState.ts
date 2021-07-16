import { DefaultValue, atom } from 'recoil'

const fullScreenState = atom({
  key: 'fullScreenState',
  default: false,
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newFullScreen) => {
        if (newFullScreen instanceof DefaultValue) {
          throw new Error
        }

        if (newFullScreen) {
          document.documentElement.requestFullscreen()
        } else {
          document.exitFullscreen()
        }
      })
    },
  ],
})

export default fullScreenState
