import Id from './Id'

declare const brand: unique symbol

export default class ReminderId extends Id {
  protected [brand]: never
}
