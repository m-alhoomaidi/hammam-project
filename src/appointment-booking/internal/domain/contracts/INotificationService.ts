export const NOTIFICATION_SERVICE = Symbol('NOTIFICATION_SERVICE');

export interface INotificationService {
  sendNotification(title: string, message: string, payload: any): Promise<void>;
}
