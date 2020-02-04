export const isBetween = <T extends number, U extends T>(lowerBound: number, upperBound: number) => (input: T): input is U => {
  return lowerBound <= input && input <= upperBound
}
