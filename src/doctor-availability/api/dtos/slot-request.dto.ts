import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SlotRequestDto {
  @IsDate()
  @IsNotEmpty()
  time: Date;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  doctorId: number;

  @IsString()
  @IsNotEmpty()
  doctorName: string;

  @IsNumber()
  cost: number;
}
