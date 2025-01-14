import { guid } from '../utils/guid';
import { Patient } from './Patient';

export class Appointment {
  constructor(
    public readonly id: string,
    public readonly slotId: string,
    public readonly patient: Patient,
    public readonly reservedAt: Date,
  ) {}

  static create(
    slotId: string,
    patient: Patient,
    reservedAt: Date,
  ): Appointment {
    if (isNaN(reservedAt.getTime())) {
      throw new Error('Invalid appointment data');
    }

    return new Appointment(guid(), slotId, patient, reservedAt);
  }
}
