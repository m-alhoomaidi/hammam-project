import { Test } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import { LoggerNotificationSender } from '../../../infrastructure/senders/logger-notification.sender';

describe('LoggerNotificationSender', () => {
  let sender: LoggerNotificationSender;
  let logSpy: jest.SpyInstance;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [LoggerNotificationSender],
    }).compile();

    sender = module.get<LoggerNotificationSender>(LoggerNotificationSender);
    logSpy = jest.spyOn(Logger.prototype, 'log');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should log notification message', async () => {
    const notification = {
      title: 'Test Title',
      message: 'Test Message',
      recipientId: 'test-recipient',
    };

    await sender.send(notification);

    expect(logSpy).toHaveBeenCalledTimes(5); // Header, Title, Message, Recipient, Footer
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Test Title'));
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('Test Message'),
    );
  });
});
