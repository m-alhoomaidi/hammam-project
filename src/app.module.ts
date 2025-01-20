import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppointmentBookingModule } from './appointment-booking/AppointmentBooking.module';
import { DoctorAvailabilityModule } from './doctor-availability/doctor-availability.module';

@Module({
  imports: [
    DoctorAvailabilityModule,
    AppointmentBookingModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
