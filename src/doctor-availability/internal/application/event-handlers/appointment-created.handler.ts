import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AppointmentCreatedEvent } from 'src/appointment-booking/internal/domain/events/appointment-created.event';
import {
  INotificationService,
  NOTIFICATION_SERVICE_1,
} from '../../domain/contracts/INotificationService';
import { DoctorAvailabilityRepository } from '../../infrastructure/repository/doctor-availability.repository';

@Injectable()
export class AppointmentCreatedHandler {
  constructor(
    private readonly doctorAvailabilityRepo: DoctorAvailabilityRepository,
    @Inject(NOTIFICATION_SERVICE_1)
    private readonly notificationService: INotificationService,
  ) {}

  @OnEvent('appointment.created')
  async handle(event: AppointmentCreatedEvent) {
    const slot = await this.doctorAvailabilityRepo.findSlotById(event.slotId);
    if (slot) {
      slot.reserveSlot();
      this.doctorAvailabilityRepo.updateSlot(slot);
    }

    this.notificationService.sendNotification(
      'Slot Reserved',
      'Slot reserved',
      {
        doctorName: slot.getDetails().doctorName,
        time: slot.getDetails().time,
        patientName: event.patientName,
      },
    );
  }
}
