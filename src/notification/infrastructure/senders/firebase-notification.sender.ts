import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import {
  INotificationSender,
  NotificationMessage,
} from '../../domain/interfaces/INotificationSender';
import { NOTIFICATION_CONSTANTS } from '../../domain/constants/tokens';

@Injectable()
export class FirebaseNotificationSender
  implements INotificationSender, OnModuleInit
{
  private firebaseApp: admin.app.App;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    const config = this.configService.get(NOTIFICATION_CONSTANTS.CONFIG_KEY);

    if (!config?.firebase) {
      throw new Error('Firebase configuration is missing');
    }

    const { projectId, clientEmail, privateKey } = config.firebase;

    this.firebaseApp = admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey: privateKey?.replace?.(/\\n/g, '\n') || privateKey,
      }),
    });
  }

  async send(notification: NotificationMessage): Promise<void> {
    if (!notification.recipientId) {
      throw new Error(NOTIFICATION_CONSTANTS.ERRORS.RECIPIENT_REQUIRED);
    }

    try {
      await this.firebaseApp.messaging().send({
        token: notification.recipientId,
        notification: {
          title: notification.title,
          body: notification.message,
        },
        data: notification.data || {},
      });
    } catch (error) {
      if (error.code === 'messaging/invalid-registration-token') {
        throw new Error(NOTIFICATION_CONSTANTS.ERRORS.INVALID_TOKEN);
      }
      throw error;
    }
  }
}
