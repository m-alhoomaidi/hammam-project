import { Injectable } from '@nestjs/common';
import { DoctorAvailabilityGateway } from 'src/appointment-booking/internal/infrastructure/gateways/DoctorAvailabilityGateway';
import { GetAvailableSlotsResponse } from './GetAvailableSlotsResponse';

@Injectable()
export class GetAvailableSlotsHandler {
  constructor(private readonly doctorAvailability: DoctorAvailabilityGateway) {}

  async execute(): Promise<GetAvailableSlotsResponse> {
    const doctorAvailableSlots =
      await this.doctorAvailability.getAllAvailableSlots();

    if (!doctorAvailableSlots) {
      throw new Error('Doctor availability not found');
    }

    return {
      slots: doctorAvailableSlots.map((slot) => ({
        id: slot.id,
        time: slot.time,
        doctorId: slot.doctorId,
        doctorName: slot.doctorName,
        isReserved: slot.isReserved,
        cost: slot.cost,
      })),
    };
  }
}
