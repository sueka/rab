type ResultType<T extends Promise<unknown>> = T extends Promise<infer U> ? U : never

type JsonPrimitive = null | boolean | number | string

interface JsonArray extends ReadonlyArray<Json> {}

interface JsonObject extends Record<string, Json> {}

type Json = JsonPrimitive | JsonArray | JsonObject

namespace Alt {
  export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
}
