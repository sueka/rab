type ResultType<T extends Promise<unknown>> = T extends Promise<infer U> ? U : never

type JsonPrimitive = null | boolean | number | string

interface JsonArray extends ReadonlyArray<Json> {}

interface JsonObject extends Record<string, Json> {}

type Json = JsonPrimitive | JsonArray | JsonObject

type EmptyRecord<T> = Record<keyof T, never>

type Index = keyof any // tslint:disable-line:no-any

declare namespace Alt {
  type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
  type ForceOmit<T, K extends Index> = Omit<T, K & keyof T>
}

declare namespace string {
  type Url = string & { _urlBrand: never }
}
