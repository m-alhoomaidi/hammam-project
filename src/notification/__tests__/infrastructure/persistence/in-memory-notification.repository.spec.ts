import { InMemoryNotificationRepository } from '../../../infrastructure/persistence/in-memory/in-memory-notification.repository';
import { Notification } from '../../../domain/entities/notification';

describe('InMemoryNotificationRepository', () => {
  let repository: InMemoryNotificationRepository;

  beforeEach(() => {
    repository = new InMemoryNotificationRepository();
  });

  it('should save notification', async () => {
    const notification = new Notification(
      'Test Title',
      'Test Message',
      'patient-123',
    );

    await repository.save(notification);
    const results = await repository.findMany();

    expect(results).toHaveLength(1);
    expect(results[0].title).toBe('Test Title');
  });

  it('should find notifications by filter', async () => {
    const notification1 = new Notification(
      'Test Title 1',
      'Test Message 1',
      'patient-123',
    );
    const notification2 = new Notification(
      'Test Title 2',
      'Test Message 2',
      'patient-456',
    );

    await repository.save(notification1);
    await repository.save(notification2);

    const results = await repository.findMany({ patientId: 'patient-123' });

    expect(results).toHaveLength(1);
    expect(results[0].patientId).toBe('patient-123');
  });

  it('should mark notification as read', async () => {
    const notification = new Notification(
      'Test Title',
      'Test Message',
      'patient-123',
    );

    await repository.save(notification);
    await repository.markAsRead(notification);

    const results = await repository.findMany();
    expect(results[0].isRead).toBeTruthy();
  });
});
