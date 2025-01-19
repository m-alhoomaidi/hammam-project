import { Injectable } from '@nestjs/common';
import {
  NOTIFICATION_CONSTANTS,
  NotificationChannel,
} from '../../domain/constants/tokens';
import { INotificationSender } from '../../domain/interfaces/INotificationSender';
import { LoggerNotificationSender } from '../senders/logger-notification.sender';
import { FirebaseNotificationSender } from '../senders/firebase-notification.sender';

@Injectable()
export class NotificationSenderFactory {
  constructor(
    private readonly loggerSender: LoggerNotificationSender,
    // TODO : Add firebase sender
    // private readonly firebaseSender: FirebaseNotificationSender,
  ) {}

  getSender(channel: NotificationChannel): INotificationSender {
    switch (channel) {
      case NOTIFICATION_CONSTANTS.CHANNELS.LOGGER:
        return this.loggerSender;
      // case NOTIFICATION_CONSTANTS.CHANNELS.FIREBASE:
      //   return this.firebaseSender;
      default:
        throw new Error(NOTIFICATION_CONSTANTS.ERRORS.UNSUPPORTED_CHANNEL);
    }
  }
}
