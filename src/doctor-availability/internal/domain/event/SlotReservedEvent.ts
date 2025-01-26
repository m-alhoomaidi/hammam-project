export class SlotReservedEvent {
  constructor(
    public readonly patientId: string,
    public readonly patientName: string,
    public readonly doctorId: number,
    public readonly doctorName: string,
    public readonly time: Date,
  ) {}
}
