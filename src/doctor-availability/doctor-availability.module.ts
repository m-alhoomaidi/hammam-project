import { Module } from '@nestjs/common';
import { DoctorAvailabilityController } from './api/controllers/doctor-availability.controller';
import { DoctorAvailabilityService } from './application/doctor-availability.service';
import { DoctorAvailabilityRepository } from './repository/doctor-availability.repository';

@Module({
  controllers: [DoctorAvailabilityController],
  providers: [DoctorAvailabilityService, DoctorAvailabilityRepository],
  exports: [],
})
export class DoctorAvailabilityModule {}
