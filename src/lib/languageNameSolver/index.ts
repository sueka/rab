import tagNativeNameMap from './__data__/tagNativeNameMap.json'

export type Tag = keyof typeof tagNativeNameMap

export function isTag(tag: unknown): tag is Tag {
  return typeof tag === 'string' && tag in tagNativeNameMap
}

export function getNativeNameByTag(tag: Tag) {
  return tagNativeNameMap[tag]
}
