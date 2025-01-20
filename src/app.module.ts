import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppointmentBookingModule } from './appointment-booking/AppointmentBooking.module';
import { DoctorAvailabilityModule } from './doctor-availability/doctor-availability.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    DoctorAvailabilityModule,
    AppointmentBookingModule,
    NotificationModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
