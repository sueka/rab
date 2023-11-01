if (process.env.BASE_NAME === undefined) {
  throw new Error // TODO
}

if (!globalThis.location.pathname.startsWith(process.env.BASE_NAME)) {
  throw new Error // TODO
}

const url = new URL(`${ globalThis.location.origin }${ process.env.BASE_NAME }`)

url.hash = globalThis.location.pathname.slice(process.env.BASE_NAME.length)

globalThis.location.replace(url.href)
