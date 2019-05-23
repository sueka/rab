export const doNothing = () => {
  // Silence is golden.
}

// const identity = <T>(x: T): T => x

export const delay = (ms: number) => new Promise((res) => { setTimeout(res, ms) })
