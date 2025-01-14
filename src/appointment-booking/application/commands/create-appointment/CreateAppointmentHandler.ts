import { Appointment } from '../../../domain/models/Appointment';
import { IAppointmentRepository } from '../../../domain/contracts/IAppointmentRepository';
import { CreateAppointment } from './CreateAppointment';
import { Patient } from '../../../domain/models/Patient';
import { CreateAppointmentResponse } from './CreateAppointmentResponse';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateAppointmentHandler {
  constructor(private readonly appointmentRepo: IAppointmentRepository) {}

  async execute(
    command: CreateAppointment,
  ): Promise<CreateAppointmentResponse> {
    const appointment = Appointment.create(
      command.slotId,
      Patient.of(command.patientId, command.patientName),
      command.reservedAt,
    );

    await this.appointmentRepo.save(appointment);
    return {
      id: appointment.id,
      slotId: appointment.slotId,
      patientId: appointment.patient.id,
      patientName: appointment.patient.name,
      reservedAt: appointment.reservedAt,
    };
  }
}
