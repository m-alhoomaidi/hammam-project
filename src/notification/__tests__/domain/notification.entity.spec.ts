import { Notification } from '../../domain/entities/notification';

describe('Notification Entity', () => {
  it('should create notification with patient ID', () => {
    const notification = new Notification(
      'Test Title',
      'Test Message',
      'patient-123',
      null,
    );

    expect(notification.title).toBe('Test Title');
    expect(notification.message).toBe('Test Message');
    expect(notification.patientId).toBe('patient-123');
    expect(notification.doctorId).toBeNull();
    expect(notification.isRead).toBeFalsy();
  });

  it('should create notification with doctor ID', () => {
    const notification = new Notification(
      'Test Title',
      'Test Message',
      null,
      'doctor-123',
    );

    expect(notification.doctorId).toBe('doctor-123');
    expect(notification.patientId).toBeNull();
  });

  it('should throw error if both patient and doctor IDs are null', () => {
    expect(() => {
      new Notification('Test Title', 'Test Message', null, null);
    }).toThrow('PatientId or DoctorId must be provided');
  });

  it('should mark notification as read', () => {
    const notification = new Notification(
      'Test Title',
      'Test Message',
      'patient-123',
    );

    notification.markAsRead();

    expect(notification.isRead).toBeTruthy();
    expect(notification.readAt).toBeDefined();
  });
});
