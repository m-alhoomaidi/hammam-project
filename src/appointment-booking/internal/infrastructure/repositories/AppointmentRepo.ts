import { Injectable } from '@nestjs/common';
import { IAppointmentRepository } from '../../domain/contracts/IAppointmentRepository';
import { Appointment } from '../../domain/models/Appointment';

@Injectable()
export class AppointmentRepository implements IAppointmentRepository {
  private readonly appointments: Appointment[] = [];

  async save(appointment: Appointment): Promise<Appointment> {
    this.appointments.push(appointment);
    return appointment;
  }

  async findAll(): Promise<Appointment[]> {
    return this.appointments;
  }

  async findById(id: string): Promise<Appointment | null> {
    return (
      this.appointments.find((appointment) => appointment.id === id) || null
    );
  }

  async findBySlotId(slotId: string): Promise<Appointment | null> {
    return (
      this.appointments.find((appointment) => appointment.slotId === slotId) ||
      null
    );
  }

  async findByPatientId(patientId: string): Promise<Appointment[]> {
    return this.appointments.filter(
      (appointment) => appointment.patient.id === patientId,
    );
  }

  async delete(id: string): Promise<boolean> {
    const index = this.appointments.findIndex(
      (appointment) => appointment.id === id,
    );
    const deletedElems = this.appointments.splice(index, 1);
    return deletedElems.length > 0;
  }
}
