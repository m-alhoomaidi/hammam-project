import { Inject, Injectable } from '@nestjs/common';
import {
  DOCTOR_AVAILABILITY,
  IDoctorAvailability,
} from 'src/doctor-availability/shared/IDoctorAvailability';
import { IDoctorAvailabilityGateway } from '../../domain/contracts/IDoctorAvailabilityGateway';

@Injectable()
export class DoctorAvailabilityGateway implements IDoctorAvailabilityGateway {
  constructor(
    @Inject(DOCTOR_AVAILABILITY)
    private readonly DoctorAvailability: IDoctorAvailability,
  ) {}

  async getAllAvailableSlots(): Promise<any[]> {
    return this.DoctorAvailability.findAvailableSlots();
  }
  isSlotAvailable(slotId: string): Promise<boolean> {
    return this.DoctorAvailability.isAvailable(slotId);
  }
}
