import { Module } from '@nestjs/common';
import { DoctorAvailabilityController } from './internal/api/controllers/doctor-availability.controller';
import { DoctorAvailabilityService } from './internal/application/doctor-availability.service';
import { eventHandlers } from './internal/application/event-handlers';
import { DoctorAvailabilityDomainService } from './internal/domain/doctor-availability-domain.service';
import { DoctorAvailabilityRepository } from './internal/infrastructure/repository/doctor-availability.repository';
import { DoctorAvailability } from './shared/DoctorAvailability';

@Module({
  controllers: [DoctorAvailabilityController],
  providers: [
    DoctorAvailabilityService,
    DoctorAvailabilityRepository,
    DoctorAvailabilityDomainService,
    DoctorAvailability,
    ...eventHandlers,
  ],
  exports: [DoctorAvailability, DoctorAvailabilityRepository],
})
export class DoctorAvailabilityModule {}
