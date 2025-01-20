import { Injectable } from '@nestjs/common';
import { Slot } from '../internal/domain/slot';
import { DoctorAvailabilityRepository } from '../internal/infrastructure/repository/doctor-availability.repository';
import { IDoctorAvailability } from './IDoctorAvailability';

@Injectable()
export class DoctorAvailability implements IDoctorAvailability {
  constructor(private readonly repository: DoctorAvailabilityRepository) {}
  async findAvailableSlots(): Promise<Slot[]> {
    return this.repository.findAvailableSlots();
  }

  async findSlotById(id: string): Promise<Slot | undefined> {
    return this.repository.findSlotById(id);
  }

  async isAvailable(slotId: string): Promise<boolean> {
    const slot = await this.repository.findSlotById(slotId);
    return slot ? !slot.isSlotReserved() : false;
  }

  async findUpcomingReservations(): Promise<Slot[]> {
    return this.repository.findUpcomingReservations();
  }
}
