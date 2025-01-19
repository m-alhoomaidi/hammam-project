import { SendNotification } from './domain/interfaces/INotification';
import { Notification } from './domain/entities/notification';

export class LoggerNotification implements SendNotification {
  async send(title: string, message: string): Promise<Notification> {
    console.log(`Title: ${title} - Message: ${message}`);
    return new Notification(title, message);
  }
}
