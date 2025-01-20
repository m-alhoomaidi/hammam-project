import { Appointment } from '../models/Appointment';

export const APPOINTMENT_REPOSITORY = Symbol('IAppointmentRepository');

export interface IAppointmentRepository {
  save(appointment: Appointment): Promise<Appointment | null>;
  findAll(): Promise<Appointment[]>;
  findById(id: string): Promise<Appointment | null>;
  findBySlotId(slotId: string): Promise<Appointment | null>;
  findByPatientId(patientId: string): Promise<Appointment[]>;
  delete(id: string): Promise<boolean>;
}
