const delay = (ms: number) => new Promise<void>((resolve) => { setTimeout(() => { resolve() }, ms) })
const timeOut = (ms: number) => new Promise<never>((_, reject) => { setTimeout(() => { reject('Promise timed out.') }, ms) })

export default delay
export { timeOut }
