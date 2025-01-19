import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { FirebaseNotificationSender } from '../../../infrastructure/senders/firebase-notification.sender';
import { NOTIFICATION_CONSTANTS } from '../../../domain/constants/tokens';
import * as admin from 'firebase-admin';

jest.mock('firebase-admin', () => {
  const messagingSendMock = jest.fn().mockResolvedValue({});
  const messagingMock = jest.fn().mockReturnValue({ send: messagingSendMock });

  return {
    initializeApp: jest.fn().mockReturnValue({
      messaging: messagingMock,
    }),
    credential: {
      cert: jest.fn().mockReturnValue('mocked-credential'),
    },
    messaging: messagingMock,
  };
});

describe('FirebaseNotificationSender', () => {
  let sender: FirebaseNotificationSender;
  let configService: ConfigService;
  let messagingSendMock: jest.Mock;

  beforeEach(async () => {
    // Get the mocked messaging.send function
    messagingSendMock = (admin.messaging() as any).send;

    const module = await Test.createTestingModule({
      providers: [
        FirebaseNotificationSender,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key) => {
              if (key === NOTIFICATION_CONSTANTS.CONFIG_KEY) {
                return {
                  firebase: {
                    projectId: 'test-project',
                    clientEmail: 'test@email.com',
                    privateKey: 'test-key\n',
                  },
                };
              }
              return null;
            }),
          },
        },
      ],
    }).compile();

    sender = module.get<FirebaseNotificationSender>(FirebaseNotificationSender);
    configService = module.get<ConfigService>(ConfigService);
  });

  beforeEach(async () => {
    jest.clearAllMocks();
    await sender.onModuleInit();
  });

  it('should initialize Firebase app', () => {
    expect(admin.initializeApp).toHaveBeenCalledWith({
      credential: 'mocked-credential',
    });
    expect(admin.credential.cert).toHaveBeenCalledWith({
      projectId: 'test-project',
      clientEmail: 'test@email.com',
      privateKey: 'test-key\n',
    });
  });

  it('should send notification through Firebase', async () => {
    const notification = {
      title: 'Test Title',
      message: 'Test Message',
      recipientId: 'test-token',
    };

    await sender.send(notification);

    expect(messagingSendMock).toHaveBeenCalledWith({
      token: 'test-token',
      notification: {
        title: 'Test Title',
        body: 'Test Message',
      },
      data: {},
    });
  });

  it('should throw error when recipient token is missing', async () => {
    const notification = {
      title: 'Test Title',
      message: 'Test Message',
    };

    await expect(sender.send(notification)).rejects.toThrow(
      NOTIFICATION_CONSTANTS.ERRORS.RECIPIENT_REQUIRED,
    );
  });

  it('should throw error when Firebase token is invalid', async () => {
    messagingSendMock.mockRejectedValueOnce({
      code: 'messaging/invalid-registration-token',
    });

    const notification = {
      title: 'Test Title',
      message: 'Test Message',
      recipientId: 'invalid-token',
    };

    await expect(sender.send(notification)).rejects.toThrow(
      NOTIFICATION_CONSTANTS.ERRORS.INVALID_TOKEN,
    );
  });
});
