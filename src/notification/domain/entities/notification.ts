export class Notification {
  private _patientId: string;
  private _doctorId: string;
  private _title: string;
  private _message: string;
  private _isRead: boolean;
  private _readAt: Date;
  private _createdAt: Date;

  constructor(
    title: string,
    message: string,
    patientId: string | null = null,
    doctorId: string | null = null,
  ) {
    if (!patientId && !doctorId) {
      throw new Error('PatientId or DoctorId must be provided');
    }
    this._patientId = patientId;
    this._doctorId = doctorId;
    this._title = title;
    this._message = message;
    this._isRead = false;
    this._createdAt = new Date();
  }

  markAsRead() {
    this._isRead = true;
    this._readAt = new Date();
  }

  get patientId() {
    return this._patientId;
  }

  get doctorId() {
    return this._doctorId;
  }
  get title() {
    return this._title;
  }

  get message() {
    return this._message;
  }

  get isRead() {
    return this._isRead;
  }

  get readAt() {
    return this._readAt;
  }

  get createdAt() {
    return this._createdAt;
  }
}
