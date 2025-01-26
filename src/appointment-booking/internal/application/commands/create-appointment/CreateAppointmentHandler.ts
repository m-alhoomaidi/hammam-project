import {
  INotificationService,
  NOTIFICATION_SERVICE,
} from '@/appointment-booking/internal/domain/contracts/INotificationService';
import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AppointmentCreatedEvent } from 'src/appointment-booking/internal/domain/events/appointment-created.event';
import {
  APPOINTMENT_REPOSITORY,
  IAppointmentRepository,
} from '../../../domain/contracts/IAppointmentRepository';
import {
  DOCTOR_AVAILABILITY_GATEWAY,
  IDoctorAvailabilityGateway,
} from '../../../domain/contracts/IDoctorAvailabilityGateway';
import { Appointment } from '../../../domain/models/Appointment';
import { CreateAppointment } from './CreateAppointment';
import { CreateAppointmentResponse } from './CreateAppointmentResponse';

@Injectable()
export class CreateAppointmentHandler {
  constructor(
    @Inject(APPOINTMENT_REPOSITORY)
    private readonly appointmentRepo: IAppointmentRepository,
    @Inject(DOCTOR_AVAILABILITY_GATEWAY)
    private readonly doctorAvailabilityGateway: IDoctorAvailabilityGateway,
    private readonly eventEmitter: EventEmitter2,
    @Inject(NOTIFICATION_SERVICE)
    private readonly noificationService: INotificationService,
  ) {}

  async execute(
    command: CreateAppointment,
  ): Promise<CreateAppointmentResponse> {
    const isAvailable = await this.doctorAvailabilityGateway.isSlotAvailable(
      command.slotId,
    );

    if (!isAvailable) {
      throw new Error('Slot is not available');
    }

    const appointment = Appointment.create(
      command.slotId,
      command.patientId,
      command.patientName,
      new Date(),
    );

    const appointmentBooked = await this.appointmentRepo.save(appointment);

    this.eventEmitter.emit(
      'appointment.created',
      new AppointmentCreatedEvent(
        appointmentBooked.id,
        appointmentBooked.slotId,
        appointmentBooked.patient.id,
        appointmentBooked.patient.name,
      ),
    );

    const slot = await this.doctorAvailabilityGateway.getSlotById(
      appointmentBooked.slotId,
    );

    this.noificationService.sendNotification('Slot Reserved', 'Slot reserved', {
      doctorName: slot.getDetails().doctorName,
      time: slot.getDetails().time,
      patientName: appointmentBooked.patient.name,
    });

    return {
      id: appointmentBooked.id,
      slotId: appointmentBooked.slotId,
      patientId: appointmentBooked.patient.id,
      patientName: appointmentBooked.patient.name,
      reservedAt: appointmentBooked.reservedAt,
    };
  }
}
