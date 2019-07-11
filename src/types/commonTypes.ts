type JsonPrimitive = null | boolean | number | string

interface JsonArray extends Array<Json> {}

interface JsonObject extends Record<string, Json> {}

type Json = JsonPrimitive | JsonArray | JsonObject
