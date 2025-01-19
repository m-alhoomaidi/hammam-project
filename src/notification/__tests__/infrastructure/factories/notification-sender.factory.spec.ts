import { Test } from '@nestjs/testing';
import { NotificationSenderFactory } from '../../../infrastructure/factories/notification-sender.factory';
import { LoggerNotificationSender } from '../../../infrastructure/senders/logger-notification.sender';
import { FirebaseNotificationSender } from '../../../infrastructure/senders/firebase-notification.sender';
import { NOTIFICATION_CONSTANTS } from '../../../domain/constants/tokens';

describe('NotificationSenderFactory', () => {
  let factory: NotificationSenderFactory;
  let loggerSender: LoggerNotificationSender;
  let firebaseSender: FirebaseNotificationSender;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        NotificationSenderFactory,
        {
          provide: LoggerNotificationSender,
          useValue: { send: jest.fn() },
        },
        // TODO : Add firebase sender
        // {
        //   provide: FirebaseNotificationSender,
        //   useValue: { send: jest.fn() },
        // },
      ],
    }).compile();

    factory = module.get<NotificationSenderFactory>(NotificationSenderFactory);
    loggerSender = module.get<LoggerNotificationSender>(
      LoggerNotificationSender,
    );
    // firebaseSender = module.get<FirebaseNotificationSender>(
    // FirebaseNotificationSender,
    // );
  });

  it('should return logger sender', () => {
    const sender = factory.getSender(NOTIFICATION_CONSTANTS.CHANNELS.LOGGER);
    expect(sender).toBe(loggerSender);
  });

  //   TODO : Add firebase sender
  //   it('should return firebase sender', () => {
  //     const sender = factory.getSender(NOTIFICATION_CONSTANTS.CHANNELS.FIREBASE);
  //     expect(sender).toBe(firebaseSender);
  //   });

  it('should throw error for invalid channel', () => {
    expect(() => {
      factory.getSender('invalid' as any);
    }).toThrow(NOTIFICATION_CONSTANTS.ERRORS.UNSUPPORTED_CHANNEL);
  });
});
