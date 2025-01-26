export abstract class SendNotification {
  abstract send(title: string, message: string, payload: any): Promise<void>;
}
