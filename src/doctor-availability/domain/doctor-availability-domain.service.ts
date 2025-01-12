import { Injectable } from '@nestjs/common';
import { DoctorAvailabilityRepository } from '../repository/doctor-availability.repository';
import { Slot } from './slot';

@Injectable()
export class DoctorAvailabilityDomainService {
  constructor(private readonly repository: DoctorAvailabilityRepository) {}

  getAvailableSlots() {
    return this.repository
      .findAvailableSlots()
      .map((slot) => slot.getDetails());
  }

  addSlot(time: Date, doctorId: number, doctorName: string, cost: number) {
    const slot = Slot.createNewSlot(
      Date.now().valueOf(),
      time,
      doctorId,
      doctorName,
      cost,
    );
    this.repository.saveSlot(slot);
    return slot.getDetails();
  }

  reserveSlot(slotId: number) {
    const slot = this.repository.findSlotById(slotId);
    if (!slot) {
      throw new Error('Slot not found');
    }
    slot.reserveSlot();
    this.repository.updateSlot(slot);
    return slot.getDetails();
  }
}
