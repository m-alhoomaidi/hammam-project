import { Module } from '@nestjs/common';
import { DoctorAvailabilityController } from './api/controllers/doctor-availability.controller';
import { DoctorAvailabilityService } from './application/doctor-availability.service';
import { DoctorAvailabilityRepository } from './repository/doctor-availability.repository';
import { DoctorAvailabilityDomainService } from './domain/doctor-availability-domain.service';

@Module({
  controllers: [DoctorAvailabilityController],
  providers: [
    DoctorAvailabilityService,
    DoctorAvailabilityRepository,
    DoctorAvailabilityDomainService,
  ],
  exports: [],
})
export class DoctorAvailabilityModule {}
