import { Notification } from '../domain/notification';

export abstract class SendNotification {
  abstract send(title: string, message: string): Promise<Notification>;
}
