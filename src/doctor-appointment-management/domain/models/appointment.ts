export enum AppointmentStatus {
  UPCOMING = 'UPCOMING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export class Appointment {
  constructor(
    public readonly id: string,
    public readonly slotId: string,
    public readonly patientId: string,
    public readonly patientName: string,
    public readonly doctorId: string,
    public status: AppointmentStatus,
    public readonly reservedAt: Date,
  ) {}

  complete(): void {
    if (this.status !== AppointmentStatus.UPCOMING) {
      throw new Error('Only upcoming appointments can be completed');
    }
    this.status = AppointmentStatus.COMPLETED;
  }

  cancel(): void {
    if (this.status !== AppointmentStatus.UPCOMING) {
      throw new Error('Only upcoming appointments can be cancelled');
    }
    this.status = AppointmentStatus.CANCELLED;
  }
}
