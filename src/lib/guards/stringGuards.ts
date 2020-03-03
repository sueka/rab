export function isUrl(input: string): input is string.Url {
  try {
    // tslint:disable-next-line:no-unused-expression
    new URL(input)

    return true
  } catch (_error) {
    return false
  }
}
