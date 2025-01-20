import { registerAs } from '@nestjs/config';
import { NOTIFICATION_CONSTANTS } from '@/notification/domain/constants/tokens';

export interface NotificationConfig {
  firebase: {
    projectId: string;
    clientEmail: string;
    privateKey: string;
  };
  defaultChannel: 'logger' | 'firebase';
}

export const notificationConfig = registerAs(
  NOTIFICATION_CONSTANTS.CONFIG_KEY,
  (): NotificationConfig => ({
    firebase: {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
    },
    defaultChannel:
      (process.env.NOTIFICATION_DEFAULT_CHANNEL as 'logger' | 'firebase') ||
      'logger',
  }),
);
