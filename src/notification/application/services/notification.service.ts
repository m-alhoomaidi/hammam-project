import { Injectable } from '@nestjs/common';
import { NOTIFICATION_CONSTANTS } from '@/notification/domain/constants/tokens';
import { Notification } from 'src/notification/domain/entities/notification';
import { INotificationRepository } from 'src/notification/domain/interfaces/INotificationRepository';

import { NotificationSenderFactory } from 'src/notification/infrastructure/factories/notification-sender.factory';
@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: INotificationRepository,
    private readonly senderFactory: NotificationSenderFactory,
  ) {}

  async sendNotification(
    title: string,
    message: string,
    patientId?: string,
    doctorId?: string,
    channel: keyof typeof NOTIFICATION_CONSTANTS.CHANNELS = 'LOGGER',
  ): Promise<void> {
    // Create and save notification
    const notification = new Notification(title, message, patientId, doctorId);
    await this.notificationRepository.save(notification);

    // Send through specified channel
    const sender = this.senderFactory.getSender(
      NOTIFICATION_CONSTANTS.CHANNELS[channel],
    );
    await sender.send({
      title,
      message,
      recipientId: patientId || doctorId,
    });
  }
}
