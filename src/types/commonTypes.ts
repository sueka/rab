type ResultType<T extends Promise<unknown>> = T extends Promise<infer U> ? U : never

type JsonPrimitive = null | boolean | number | string

interface JsonArray extends ReadonlyArray<Json> {}

interface JsonObject extends Record<string, Json> {}

type Json = JsonPrimitive | JsonArray | JsonObject

type EmptyRecord<T> = Record<keyof T, never>

type Index = keyof any // tslint:disable-line:no-any

type Method<T extends (that: never, ...args: never[]) => unknown> = T extends (that: infer U, ...args: infer V) => infer W ? (this: U, ...args: V) => W : never

declare namespace Alt {
  type Extract<T, U extends T> = T extends U ? T : never
  type Exclude<T, U extends T> = T extends U ? never : T
  type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
  type ForceOmit<T, K extends Index> = Omit<T, K & keyof T>
}

declare namespace string {
  type Url = string & { _urlBrand: never }
}
