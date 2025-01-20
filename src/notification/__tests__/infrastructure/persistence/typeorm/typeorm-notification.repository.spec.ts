import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmNotificationRepository } from '../../../../infrastructure/persistence/typeorm/typeorm-notification.repository';
import { NotificationEntity } from '../../../../infrastructure/persistence/typeorm/notification.entity';
import { Notification } from '../../../../domain/entities/notification';

describe('TypeOrmNotificationRepository', () => {
  let repository: TypeOrmNotificationRepository;
  let typeOrmRepository: jest.Mocked<Repository<NotificationEntity>>;

  beforeEach(async () => {
    // Create mock repository
    const mockRepository = {
      save: jest.fn(),
      createQueryBuilder: jest.fn(),
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TypeOrmNotificationRepository,
        {
          provide: getRepositoryToken(NotificationEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    repository = module.get<TypeOrmNotificationRepository>(
      TypeOrmNotificationRepository,
    );
    typeOrmRepository = module.get(getRepositoryToken(NotificationEntity));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('save', () => {
    it('should save notification entity', async () => {
      const notification = new Notification(
        'Test Title',
        'Test Message',
        'patient-123',
        null,
      );

      typeOrmRepository.save.mockResolvedValue({
        id: '1',
        title: notification.title,
        message: notification.message,
        patientId: notification.patientId,
        doctorId: notification.doctorId,
        isRead: notification.isRead,
        createdAt: notification.createdAt,
        readAt: notification.readAt,
      });

      await repository.save(notification);

      expect(typeOrmRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          title: notification.title,
          message: notification.message,
          patientId: notification.patientId,
          isRead: notification.isRead,
        }),
      );
    });
  });

  describe('findMany', () => {
    it('should find notifications with no filters', async () => {
      const mockQueryBuilder = {
        getMany: jest.fn().mockResolvedValue([]),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
      };

      typeOrmRepository.createQueryBuilder.mockReturnValue(
        mockQueryBuilder as any,
      );

      await repository.findMany();

      expect(typeOrmRepository.createQueryBuilder).toHaveBeenCalledWith(
        'notification',
      );
      expect(mockQueryBuilder.getMany).toHaveBeenCalled();
    });

    it('should apply filters correctly', async () => {
      const mockQueryBuilder = {
        getMany: jest.fn().mockResolvedValue([]),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
      };

      typeOrmRepository.createQueryBuilder.mockReturnValue(
        mockQueryBuilder as any,
      );

      const filters = {
        patientId: 'patient-123',
        isRead: false,
        title: 'Test',
      };

      await repository.findMany(filters);

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'notification.patientId = :patientId',
        { patientId: 'patient-123' },
      );
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'notification.isRead = :isRead',
        { isRead: false },
      );
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'notification.title ILIKE :title',
        { title: '%Test%' },
      );
    });

    it('should handle date filters', async () => {
      const mockQueryBuilder = {
        getMany: jest.fn().mockResolvedValue([]),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
      };

      typeOrmRepository.createQueryBuilder.mockReturnValue(
        mockQueryBuilder as any,
      );

      const testDate = new Date('2024-01-01');
      await repository.findMany({
        createdAt: testDate,
      });

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'DATE(notification.createdAt) = DATE(:createdAt)',
        { createdAt: testDate },
      );
    });
  });

  describe('markAsRead', () => {
    it('should mark notification as read', async () => {
      const notification = new Notification(
        'Test Title',
        'Test Message',
        'patient-123',
        null,
      );

      typeOrmRepository.update.mockResolvedValue({ affected: 1 } as any);

      await repository.markAsRead(notification);

      expect(typeOrmRepository.update).toHaveBeenCalledWith(
        {
          patientId: notification.patientId,
          doctorId: notification.doctorId,
          isRead: false,
        },
        expect.objectContaining({
          isRead: true,
          readAt: expect.any(Date),
        }),
      );
    });

    it('should handle case when notification is not found', async () => {
      const notification = new Notification(
        'Test Title',
        'Test Message',
        'patient-123',
        null,
      );

      typeOrmRepository.update.mockResolvedValue({ affected: 0 } as any);

      await repository.markAsRead(notification);

      expect(typeOrmRepository.update).toHaveBeenCalled();
      // You might want to add additional assertions based on how you handle this case
    });
  });

  describe('error handling', () => {
    it('should handle database errors during save', async () => {
      const notification = new Notification(
        'Test Title',
        'Test Message',
        'patient-123',
        null,
      );

      typeOrmRepository.save.mockRejectedValue(new Error('Database error'));

      await expect(repository.save(notification)).rejects.toThrow(
        'Database error',
      );
    });

    it('should handle database errors during query', async () => {
      const mockQueryBuilder = {
        getMany: jest.fn().mockRejectedValue(new Error('Query error')),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
      };

      typeOrmRepository.createQueryBuilder.mockReturnValue(
        mockQueryBuilder as any,
      );

      await expect(repository.findMany()).rejects.toThrow('Query error');
    });
  });
});
