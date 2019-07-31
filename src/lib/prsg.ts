export default function prsg() {
  const length = Math.floor(Math.log(Number.MAX_SAFE_INTEGER) / Math.log(36)) - 1

  return Math.floor(36 ** (length + 1) * Math.random()).toString(36).padStart(length, '0')
}
