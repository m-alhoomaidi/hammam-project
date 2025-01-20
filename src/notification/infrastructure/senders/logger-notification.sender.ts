import { Injectable, Logger } from '@nestjs/common';
import {
  INotificationSender,
  NotificationMessage,
} from '../../domain/interfaces/INotificationSender';

@Injectable()
export class LoggerNotificationSender implements INotificationSender {
  private readonly logger = new Logger(LoggerNotificationSender.name);

  async send(notification: NotificationMessage): Promise<void> {
    this.logger.log('=== Sending Notification ===');
    this.logger.log(`Title: ${notification.title}`);
    this.logger.log(`Message: ${notification.message}`);
    this.logger.log(
      `Recipient: ${notification.recipientId || 'No specific recipient'}`,
    );
    if (notification.data) {
      this.logger.log('Additional Data:', notification.data);
    }
    this.logger.log('=========================');
  }
}
