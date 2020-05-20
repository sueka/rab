if (process.env.BASE === undefined) {
  throw new Error // TODO
}

const basename = process.env.BASE.slice(0, -1)

if (!window.location.pathname.startsWith(basename)) {
  throw new Error // TODO
}

const url = new URL(`${ window.location.origin }${ basename }`)

url.hash = window.location.pathname.slice(basename.length)

window.location.replace(url.href)
