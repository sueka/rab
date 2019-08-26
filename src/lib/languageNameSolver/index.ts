import tagNativeNameMap from './__data__/tagNativeNameMap.json'

export type Tag = keyof typeof tagNativeNameMap

export function isTag(tag: string): tag is Tag {
  return tag in tagNativeNameMap
}

export function getNativeNameByTag(tag: Tag) {
  return tagNativeNameMap[tag]
}
