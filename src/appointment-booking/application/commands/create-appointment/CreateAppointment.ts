import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsUUID, IsString } from 'class-validator';

export class CreateAppointment {
  @IsUUID()
  slotId: string;

  @IsUUID()
  patientId: string;

  @IsString()
  @IsNotEmpty()
  patientName: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  reservedAt: Date;
}
