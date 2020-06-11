import Reminder from '~/domain/entity/Reminder'
import ReminderId from '~/domain/vo/ReminderId'

export default interface ReminderRepository {
  /**
   * @throws {Error} if not found.
   */
  findById(reminderId: ReminderId): Promise<Reminder>

  /**
   * @throws {Error} if failed to store.
   */
  store(reminder: Reminder): Promise<void>

  /**
   * @throws {Error} if not found.
   */
  remove(reminderId: Reminder): Promise<void>
}
