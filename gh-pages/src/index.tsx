if (process.env.BASE_URL === undefined || !process.env.BASE_URL.startsWith(window.location.origin)) {
  throw new Error // TODO
}

const url = new URL(process.env.BASE_URL)

url.hash = window.location.pathname

window.location.replace(url.href)
