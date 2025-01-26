import { LoggerNotification } from '@/notification/logger-notification';
import { Injectable } from '@nestjs/common';
import { INotificationService } from '../../domain/contracts/INotificationService';

@Injectable()
export class NotificationService implements INotificationService {
  constructor(private readonly loggerNotification: LoggerNotification) {}

  async sendNotification(
    title: string,
    message: string,
    payload: any,
  ): Promise<void> {
    await this.loggerNotification.send(title, message, payload);
  }
}
