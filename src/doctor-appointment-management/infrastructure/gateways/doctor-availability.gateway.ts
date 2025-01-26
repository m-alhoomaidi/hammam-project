import { Injectable } from '@nestjs/common';
import { DoctorAvailabilityPort } from '../../domain/ports/doctor-availability.port';
import { DoctorAvailability } from '../../../doctor-availability/shared/DoctorAvailability';

@Injectable()
export class DoctorAvailabilityGateway implements DoctorAvailabilityPort {
  constructor(private readonly doctorAvailability: DoctorAvailability) {}

  async findSlotById(slotId: string) {
    const slot = await this.doctorAvailability.findSlotById(slotId);
    if (!slot) {
      return null;
    }
        
    const details = slot.getDetails();
    return {
      id: details.id,
      time: details.time,
      doctorId: details.doctorId.toString(), // Convert number to string
      isReserved: details.isReserved,
      cost: details.cost,
    };
  }
}
