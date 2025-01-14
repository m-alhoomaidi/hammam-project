import { Module } from '@nestjs/common';
import { CreateAppointmentBookingController } from './api/CreateAppointmentBookingController';

@Module({
  controllers: [CreateAppointmentBookingController],
  providers: [],
  exports: [],
})
export class AppointmentBookingModule {}
