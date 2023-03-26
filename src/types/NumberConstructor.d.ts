interface NumberConstructor {
  <T extends `${ number }`>(value: T): NumberFrom<T>
}
