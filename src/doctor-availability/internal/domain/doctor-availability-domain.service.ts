import { Injectable } from '@nestjs/common';
import { DoctorAvailabilityRepository } from '../infrastructure/repository/doctor-availability.repository';
import { Slot } from './slot';

@Injectable()
export class DoctorAvailabilityDomainService {
  constructor(private readonly repository: DoctorAvailabilityRepository) {}

  async getAvailableSlots() {
    const slots = await this.repository.findAvailableSlots();
    return slots.map((slot) => slot.getDetails());
  }

  async getAllSlots() {
    const slots = await this.repository.findAllSlots();
    return slots.map((slot) => slot.getDetails());
  }

  addSlot(time: Date, doctorId: number, doctorName: string, cost: number) {
    const slot = Slot.createNewSlot(time, doctorId, doctorName, false, cost);
    this.repository.saveSlot(slot);
    return slot.getDetails();
  }

  async reserveSlot(slotId: string) {
    const slot = await this.repository.findSlotById(slotId);
    if (!slot) {
      throw new Error('Slot not found');
    }
    slot.reserveSlot();
    this.repository.updateSlot(slot);
    return slot.getDetails();
  }
}
