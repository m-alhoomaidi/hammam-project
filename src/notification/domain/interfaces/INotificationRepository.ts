import { Notification } from '../entities/notification';
export type NotificationFilter = {
  patientId?: string;
  doctorId?: string;
  title?: string;
  message?: string;
  isRead?: boolean;
  createdAt?: Date;
  readAt?: Date;
};

export abstract class INotificationRepository {
  abstract save(notification: Notification): Promise<void>;
  abstract findMany(filter?: NotificationFilter): Promise<Notification[]>;
  abstract findOne(filter?: NotificationFilter): Promise<Notification | null>;
  abstract markAsRead(notification: Notification): Promise<void>;
}
