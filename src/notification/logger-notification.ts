import { SendNotification } from './domain/interfaces/INotification';

export class LoggerNotification implements SendNotification {
  async send(title: string, message: string, payload: any): Promise<void> {
    console.log(`Title: ${title} - Message: ${message} - ${payload}`);
    // return new Notification(title, message);
  }
}
