type JsonPrimitive = null | boolean | number | string

interface JsonArray {
  [index: number]: Json
}

interface JsonObject {
  [member: string]: Json
}

type Json = JsonPrimitive | JsonArray | JsonObject
