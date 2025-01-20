import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AppointmentCreatedEvent } from 'src/appointment-booking/internal/domain/events/appointment-created.event';
import { DoctorAvailabilityRepository } from '../../infrastructure/repository/doctor-availability.repository';

@Injectable()
export class AppointmentCreatedHandler {
  constructor(
    private readonly doctorAvailabilityRepo: DoctorAvailabilityRepository,
  ) {}

  @OnEvent('appointment.created')
  async handle(event: AppointmentCreatedEvent) {
    console.log(`Handling event: Slot ${event.slotId} is now reserved.`);

    const slot = await this.doctorAvailabilityRepo.findSlotById(event.slotId);
    if (slot) {
      slot.reserveSlot();
      this.doctorAvailabilityRepo.updateSlot(slot);
    }
  }
}
