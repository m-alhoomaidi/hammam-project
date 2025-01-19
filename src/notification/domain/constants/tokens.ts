export const NOTIFICATION_CONSTANTS = {
  // Repository token
  REPOSITORY: 'NOTIFICATION_REPOSITORY',

  // Config keys
  CONFIG_KEY: 'notification',

  // Notification channels
  CHANNELS: {
    LOGGER: 'logger',
    FIREBASE: 'firebase',
  } as const,

  // Error messages
  ERRORS: {
    INVALID_TOKEN: 'Invalid Firebase token',
    RECIPIENT_REQUIRED: 'Firebase notifications require a recipient token',
    UNSUPPORTED_CHANNEL: 'Unsupported notification channel',
  } as const,
} as const;

export type NotificationChannel =
  (typeof NOTIFICATION_CONSTANTS.CHANNELS)[keyof typeof NOTIFICATION_CONSTANTS.CHANNELS];
