import { Module } from '@nestjs/common';
import { NotificationService } from './application/services/notification.service';
import { NotificationSenderFactory } from './infrastructure/factories/notification-sender.factory';
import { LoggerNotificationSender } from './infrastructure/senders/logger-notification.sender';
import { InMemoryNotificationRepository } from './infrastructure/persistence/in-memory/in-memory-notification.repository';
import { INotificationRepository } from './domain/interfaces/INotificationRepository';

@Module({
  imports: [],
  providers: [
    NotificationService,
    NotificationSenderFactory,
    LoggerNotificationSender,
    {
      provide: INotificationRepository,
      useClass: InMemoryNotificationRepository,
    },
  ],
  exports: [NotificationService],
})
export class NotificationModule {}
