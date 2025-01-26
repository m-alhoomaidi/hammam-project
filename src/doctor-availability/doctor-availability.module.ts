import { NotificationModule } from '@/notification/notification.module';
import { Module } from '@nestjs/common';
import { DoctorAvailabilityController } from './internal/api/controllers/doctor-availability.controller';
import { DoctorAvailabilityService } from './internal/application/doctor-availability.service';
import { eventHandlers } from './internal/application/event-handlers';
import { NOTIFICATION_SERVICE_1 } from './internal/domain/contracts/INotificationService';
import { DoctorAvailabilityDomainService } from './internal/domain/doctor-availability-domain.service';
import { DoctorAvailabilityRepository } from './internal/infrastructure/repository/doctor-availability.repository';
import { NotificationService } from './internal/infrastructure/services/NotificationService';
import { DoctorAvailability } from './shared/DoctorAvailability';
import { DOCTOR_AVAILABILITY } from './shared/IDoctorAvailability';

@Module({
  imports: [NotificationModule],
  controllers: [DoctorAvailabilityController],
  providers: [
    DoctorAvailabilityService,
    DoctorAvailabilityRepository,
    DoctorAvailabilityDomainService,
    DoctorAvailability,
    NotificationService,
    { provide: DOCTOR_AVAILABILITY, useClass: DoctorAvailability },
    { provide: NOTIFICATION_SERVICE_1, useClass: NotificationService },
    ...eventHandlers,
  ],
  exports: [DoctorAvailability, DoctorAvailabilityRepository],
})
export class DoctorAvailabilityModule {}
