import { Test } from '@nestjs/testing';
import { NotificationService } from '../../../application/services/notification.service';
import { INotificationRepository } from '../../../domain/interfaces/INotificationRepository';
import { NotificationSenderFactory } from '../../../infrastructure/factories/notification-sender.factory';
import { NOTIFICATION_CONSTANTS } from '../../../domain/constants/tokens';

describe('NotificationService', () => {
  let service: NotificationService;
  let repository: jest.Mocked<INotificationRepository>;
  let senderFactory: jest.Mocked<NotificationSenderFactory>;
  let mockSender: jest.Mocked<any>;

  beforeEach(async () => {
    mockSender = { send: jest.fn() };

    const module = await Test.createTestingModule({
      providers: [
        NotificationService,
        {
          provide: INotificationRepository,
          useValue: {
            save: jest.fn(),
            findMany: jest.fn(),
            markAsRead: jest.fn(),
          },
        },
        {
          provide: NotificationSenderFactory,
          useValue: {
            getSender: jest.fn().mockReturnValue(mockSender),
          },
        },
      ],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
    repository = module.get(INotificationRepository);
    senderFactory = module.get(NotificationSenderFactory);
  });

  it('should send notification and save to repository', async () => {
    await service.sendNotification(
      'Test Title',
      'Test Message',
      'patient-123',
      null,
      'LOGGER',
    );

    expect(repository.save).toHaveBeenCalled();
    expect(mockSender.send).toHaveBeenCalledWith({
      title: 'Test Title',
      message: 'Test Message',
      recipientId: 'patient-123',
    });
    expect(senderFactory.getSender).toHaveBeenCalledWith(
      NOTIFICATION_CONSTANTS.CHANNELS.LOGGER,
    );
  });

  it('should use logger as default channel', async () => {
    await service.sendNotification('Test Title', 'Test Message', 'patient-123');

    expect(senderFactory.getSender).toHaveBeenCalledWith(
      NOTIFICATION_CONSTANTS.CHANNELS.LOGGER,
    );
  });

  it('should handle firebase channel', async () => {
    await service.sendNotification(
      'Test Title',
      'Test Message',
      'patient-123',
      null,
      'FIREBASE',
    );

    expect(senderFactory.getSender).toHaveBeenCalledWith(
      NOTIFICATION_CONSTANTS.CHANNELS.FIREBASE,
    );
  });
});
