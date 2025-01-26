import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppointmentBookingModule } from './appointment-booking/AppointmentBooking.module';
import { DoctorAvailabilityModule } from './doctor-availability/doctor-availability.module';
import { NotificationModule } from './notification/notification.module';
import { DoctorAppointmentManagementModule } from './doctor-appointment-management/doctor-appointment-management.module';

@Module({
  imports: [
    DoctorAvailabilityModule,
    AppointmentBookingModule,
    NotificationModule,
    DoctorAppointmentManagementModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
