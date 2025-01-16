import { SendNotification } from './interfaces/INotification';
import { Notification } from './domain/notification';

export class LoggerNotification implements SendNotification {
  async send(title: string, message: string): Promise<Notification> {
    console.log(`Title: ${title} - Message: ${message}`);
    return new Notification(title, message);
  }
}
