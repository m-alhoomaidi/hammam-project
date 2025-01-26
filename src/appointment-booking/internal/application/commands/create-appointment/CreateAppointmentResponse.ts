import { CreateAppointment } from './CreateAppointment';

export class CreateAppointmentResponse extends CreateAppointment {
  id: string;
  reservedAt: Date;
}
