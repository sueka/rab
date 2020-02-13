if (process.env.BASE_URL === undefined || !process.env.BASE_URL.startsWith(window.location.origin)) {
  throw new Error // TODO
}

const basename = process.env.BASE_URL.slice(window.location.origin.length)

if (!window.location.pathname.startsWith(basename)) {
  throw new Error // TODO
}

const url = new URL(process.env.BASE_URL)

url.hash = window.location.pathname.slice(basename.length)

window.location.replace(url.href)
