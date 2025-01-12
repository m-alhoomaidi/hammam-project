import { Module } from '@nestjs/common';
import { DoctorAvailabilityModule } from './doctor-availability/doctor-availability.module';

@Module({
  imports: [DoctorAvailabilityModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
