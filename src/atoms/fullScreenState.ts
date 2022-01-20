import { atom } from 'recoil'

const fullScreenState = atom({
  key: 'fullScreenState',
  default: document.fullscreenElement !== null,
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newFullScreen) => {
        // TODO: Delete the next line
        // tslint:disable-next-line:strict-type-predicates
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
