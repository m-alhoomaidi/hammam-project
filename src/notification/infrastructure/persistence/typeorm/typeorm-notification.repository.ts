import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  INotificationRepository,
  NotificationFilter,
} from '../../../domain/interfaces/INotificationRepository';
import { Notification } from '../../../domain/entities/notification';
import { NotificationEntity } from './notification.entity';

@Injectable()
export class TypeOrmNotificationRepository implements INotificationRepository {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly repository: Repository<NotificationEntity>,
  ) {}

  private toEntity(domain: Notification): NotificationEntity {
    const entity = new NotificationEntity();
    entity.patientId = domain.patientId;
    entity.doctorId = domain.doctorId;
    entity.title = domain.title;
    entity.message = domain.message;
    entity.isRead = domain.isRead;
    entity.readAt = domain.readAt;
    return entity;
  }

  async findOne(filter?: NotificationFilter): Promise<Notification | null> {
    const entity = await this.repository.findOne({ where: filter });
    return entity ? this.toDomain(entity) : null;
  }

  private toDomain(entity: NotificationEntity): Notification {
    return new Notification(
      entity.title,
      entity.message,
      entity.patientId,
      entity.doctorId,
    );
  }

  async save(notification: Notification): Promise<void> {
    const entity = this.toEntity(notification);
    await this.repository.save(entity);
  }

  async findMany(filter?: NotificationFilter): Promise<Notification[]> {
    const queryBuilder = this.repository.createQueryBuilder('notification');

    if (filter) {
      if (filter.patientId !== undefined) {
        queryBuilder.andWhere('notification.patientId = :patientId', {
          patientId: filter.patientId,
        });
      }

      if (filter.doctorId !== undefined) {
        queryBuilder.andWhere('notification.doctorId = :doctorId', {
          doctorId: filter.doctorId,
        });
      }

      if (filter.title !== undefined) {
        queryBuilder.andWhere('notification.title ILIKE :title', {
          title: `%${filter.title}%`,
        });
      }

      if (filter.message !== undefined) {
        queryBuilder.andWhere('notification.message ILIKE :message', {
          message: `%${filter.message}%`,
        });
      }

      if (filter.isRead !== undefined) {
        queryBuilder.andWhere('notification.isRead = :isRead', {
          isRead: filter.isRead,
        });
      }

      if (filter.createdAt !== undefined) {
        queryBuilder.andWhere(
          'DATE(notification.createdAt) = DATE(:createdAt)',
          { createdAt: filter.createdAt },
        );
      }

      if (filter.readAt !== undefined) {
        queryBuilder.andWhere('DATE(notification.readAt) = DATE(:readAt)', {
          readAt: filter.readAt,
        });
      }
    }

    const entities = await queryBuilder.getMany();
    return entities.map((entity) => this.toDomain(entity));
  }

  async markAsRead(notification: Notification): Promise<void> {
    await this.repository.update(
      {
        patientId: notification.patientId,
        doctorId: notification.doctorId,
        isRead: false,
      },
      {
        isRead: true,
        readAt: new Date(),
      },
    );
  }
}
