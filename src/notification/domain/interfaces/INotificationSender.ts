export interface NotificationMessage {
  title: string;
  message: string;
  recipientId?: string;
  doctorId?: string;
  data?: Record<string, any>;
}

export abstract class INotificationSender {
  abstract send(notification: NotificationMessage): Promise<void>;
}
