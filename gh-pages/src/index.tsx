if (process.env.BASE === undefined) {
  throw new Error // TODO
}

const basename = process.env.BASE.slice(0, -1)

if (!globalThis.location.pathname.startsWith(basename)) {
  throw new Error // TODO
}

const url = new URL(`${ globalThis.location.origin }${ basename }`)

url.hash = globalThis.location.pathname.slice(basename.length)

globalThis.location.replace(url.href)
