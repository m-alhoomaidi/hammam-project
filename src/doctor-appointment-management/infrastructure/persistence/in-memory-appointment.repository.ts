import { Injectable } from '@nestjs/common';
import { Appointment } from '../../domain/models/appointment';
import { AppointmentRepositoryPort } from '../../domain/ports/appointment-repository.port';
import { AppointmentStatus } from '../../domain/models/appointment';

@Injectable()
export class InMemoryAppointmentRepository implements AppointmentRepositoryPort {
  private appointments: Appointment[] = [];

  async findUpcomingAppointmentsByDoctorId(doctorId: string): Promise<Appointment[]> {
    return this.appointments.filter(
      appointment => 
        appointment.doctorId === doctorId && 
        appointment.status === AppointmentStatus.UPCOMING
    );
  }

  async save(appointment: Appointment): Promise<void> {
    const index = this.appointments.findIndex(a => a.id === appointment.id);
    if (index !== -1) {
      this.appointments[index] = appointment;
    } else {
      this.appointments.push(appointment);
    }
  }

  async findById(id: string): Promise<Appointment | null> {
    const appointment = this.appointments.find(a => a.id === id);
    return appointment || null;
  }
}
