export const NOTIFICATION_SERVICE_1 = Symbol('NOTIFICATION_SERVICE_1');

export interface INotificationService {
  sendNotification(title: string, message: string, payload: any): Promise<void>;
}
