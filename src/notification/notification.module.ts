import { Module } from '@nestjs/common';
import { NotificationService } from './application/services/notification.service';
import { INotificationRepository } from './domain/interfaces/INotificationRepository';
import { NotificationSenderFactory } from './infrastructure/factories/notification-sender.factory';
import { InMemoryNotificationRepository } from './infrastructure/persistence/in-memory/in-memory-notification.repository';
import { LoggerNotificationSender } from './infrastructure/senders/logger-notification.sender';
import { LoggerNotification } from './logger-notification';

@Module({
  imports: [],
  providers: [
    NotificationService,
    NotificationSenderFactory,
    LoggerNotificationSender,
    LoggerNotification,
    {
      provide: INotificationRepository,
      useClass: InMemoryNotificationRepository,
    },
  ],
  exports: [NotificationService, LoggerNotification],
})
export class NotificationModule {}
