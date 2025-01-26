import { Appointment } from '../models/appointment';

export abstract class AppointmentRepositoryPort {
  abstract findUpcomingAppointmentsByDoctorId(doctorId: string): Promise<Appointment[]>;
  abstract save(appointment: Appointment): Promise<void>;
  abstract findById(id: string): Promise<Appointment | null>;
}
