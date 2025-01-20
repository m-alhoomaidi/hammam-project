import { Injectable } from '@nestjs/common';
import {
  INotificationRepository,
  NotificationFilter,
} from '../../../domain/interfaces/INotificationRepository';
import { Notification } from 'src/notification/domain/entities/notification';

@Injectable()
export class InMemoryNotificationRepository implements INotificationRepository {
  private notifications: Notification[] = [];

  async save(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }

  async findMany(filter?: NotificationFilter): Promise<Notification[]> {
    const filteredNotifications = [...this.notifications];

    if (!filter) {
      return filteredNotifications;
    }

    return filteredNotifications.filter((notification) => {
      let matches = true;

      if (filter.patientId !== undefined) {
        matches = matches && notification.patientId === filter.patientId;
      }

      if (filter.doctorId !== undefined) {
        matches = matches && notification.doctorId === filter.doctorId;
      }

      if (filter.title !== undefined) {
        matches = matches && notification.title.includes(filter.title);
      }

      if (filter.message !== undefined) {
        matches = matches && notification.message.includes(filter.message);
      }

      if (filter.isRead !== undefined) {
        matches = matches && notification.isRead === filter.isRead;
      }

      if (filter.createdAt !== undefined) {
        matches =
          matches &&
          notification.createdAt.getTime() === filter.createdAt.getTime();
      }

      if (filter.readAt !== undefined) {
        matches =
          matches && notification.readAt?.getTime() === filter.readAt.getTime();
      }

      return matches;
    });
  }

  async markAsRead(notification: Notification): Promise<void> {
    const index = this.notifications.findIndex(
      (n) =>
        n.patientId === notification.patientId &&
        n.doctorId === notification.doctorId &&
        n.createdAt === notification.createdAt,
    );

    if (index !== -1) {
      this.notifications[index].markAsRead();
    }
  }

  findOne(filter?: NotificationFilter): Promise<Notification | null> {
    return (
      Promise.resolve(
        this.notifications.find((notification) => {
          return Object.keys(filter || {}).every((key) => {
            return notification[key] === filter[key];
          });
        }),
      ) || null
    );
  }
}
