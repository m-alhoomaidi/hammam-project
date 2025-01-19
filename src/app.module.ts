import { Module } from '@nestjs/common';
import { DoctorAvailabilityModule } from './doctor-availability/doctor-availability.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [DoctorAvailabilityModule, NotificationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
