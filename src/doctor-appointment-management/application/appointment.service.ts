import { Inject, Injectable } from '@nestjs/common';
import { Appointment } from '../domain/models/appointment';
import { AppointmentRepositoryPort } from '../domain/ports/appointment-repository.port';
import { DoctorAvailabilityPort } from '../domain/ports/doctor-availability.port';

@Injectable()
export class AppointmentService {
  constructor(
    @Inject(AppointmentRepositoryPort)
    private readonly appointmentRepository: AppointmentRepositoryPort,
    @Inject(DoctorAvailabilityPort)
    private readonly doctorAvailability: DoctorAvailabilityPort,
  ) { }

  async getUpcomingAppointments(doctorId: string): Promise<Appointment[]> {
    return this.appointmentRepository.findUpcomingAppointmentsByDoctorId(doctorId);
  }

  async completeAppointment(appointmentId: string): Promise<void> {
    const appointment = await this.appointmentRepository.findById(appointmentId);
    if (!appointment) {
      throw new Error('Appointment not found');
    }

    // Verify the slot exists
    const slot = await this.doctorAvailability.findSlotById(appointment.slotId);
    if (!slot) {
      throw new Error('Associated slot not found');
    }

    appointment.complete();
    await this.appointmentRepository.save(appointment);
  }

  async cancelAppointment(appointmentId: string): Promise<void> {
    const appointment = await this.appointmentRepository.findById(appointmentId);
    if (!appointment) {
      throw new Error('Appointment not found');
    }

    // Verify the slot exists
    const slot = await this.doctorAvailability.findSlotById(appointment.slotId);
    if (!slot) {
      throw new Error('Associated slot not found');
    }

    appointment.cancel();
    await this.appointmentRepository.save(appointment);
  }
}
