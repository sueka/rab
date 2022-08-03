import { atom } from 'recoil'

const fullScreenState = atom({
  key: 'fullScreenState',
  // full screen 状態でない場合は null、Fullscreen API をサポートしていない場合は undefined
  default: document.fullscreenElement != null,
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newFullScreen) => {
        // TODO: Delete the next line
        if (typeof newFullScreen !== 'boolean') {
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
