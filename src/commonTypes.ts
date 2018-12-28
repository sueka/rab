export interface KeyValueMapObject<T> {
  [key: string]: T
}

type JsonPrimitive = null | boolean | number | string

interface JsonArray {
  [index: number]: Json
}

export interface JsonObject {
  [member: string]: Json
}

export type Json = JsonPrimitive | JsonArray | JsonObject
