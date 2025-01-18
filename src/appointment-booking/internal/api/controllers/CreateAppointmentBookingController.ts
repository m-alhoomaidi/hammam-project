import { Body, Controller, Post } from '@nestjs/common';
import { CreateAppointment } from '../../application/commands/create-appointment/CreateAppointment';
import { CreateAppointmentHandler } from '../../application/commands/create-appointment/CreateAppointmentHandler';
import { CreateAppointmentResponse } from '../../application/commands/create-appointment/CreateAppointmentResponse';

@Controller('api-v1')
export class CreateAppointmentBookingController {
  constructor(
    private readonly createAppointmentHandler: CreateAppointmentHandler,
  ) {}
  @Post('/book-appointment')
  async createAppointmentBooking(
    @Body('data') data: CreateAppointment,
  ): Promise<CreateAppointmentResponse> {
    return this.createAppointmentHandler.execute(data);
  }
}
