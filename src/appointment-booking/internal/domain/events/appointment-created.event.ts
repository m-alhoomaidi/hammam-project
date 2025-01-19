export class AppointmentCreatedEvent {
  constructor(
    public readonly appointmentId: string,
    public readonly slotId: string,
    public readonly patientId: string,
    public readonly patientName: string,
  ) {}
}
