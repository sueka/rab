import codeNativeNameMap from './__data__/codeNativeNameMap.json'

export type Code = keyof typeof codeNativeNameMap

export function isCode(code: string): code is Code {
  return code in codeNativeNameMap
}

export function getNativeNameByCode(code: Code) {
  return codeNativeNameMap[code]
}
