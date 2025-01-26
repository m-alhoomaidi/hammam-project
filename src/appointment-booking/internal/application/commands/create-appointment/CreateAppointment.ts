import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateAppointment {
  @IsUUID()
  slotId: string;

  @IsUUID()
  patientId: string;

  @IsString()
  @IsNotEmpty()
  patientName: string;
}
