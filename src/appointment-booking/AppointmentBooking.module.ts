import { NotificationModule } from '@/notification/notification.module';
import { Module } from '@nestjs/common';
import { DoctorAvailabilityModule } from 'src/doctor-availability/doctor-availability.module';
import { DoctorAvailability } from '../doctor-availability/shared/DoctorAvailability';
import { DOCTOR_AVAILABILITY } from '../doctor-availability/shared/IDoctorAvailability';
import { CreateAppointmentBookingController } from './internal/api/controllers/CreateAppointmentBookingController';
import { GetAvailableSlotsController } from './internal/api/controllers/GetAvailableSlotsController';
import { commandHandlers } from './internal/application/commands';
import { queryHandlers } from './internal/application/queries';
import { APPOINTMENT_REPOSITORY } from './internal/domain/contracts/IAppointmentRepository';
import { DOCTOR_AVAILABILITY_GATEWAY } from './internal/domain/contracts/IDoctorAvailabilityGateway';
import { NOTIFICATION_SERVICE } from './internal/domain/contracts/INotificationService';
import { DoctorAvailabilityGateway } from './internal/infrastructure/gateways/DoctorAvailabilityGateway';
import { AppointmentRepository } from './internal/infrastructure/repositories/AppointmentRepo';
import { NotificationService } from './internal/infrastructure/services/NotificationService';
@Module({
  imports: [DoctorAvailabilityModule, NotificationModule],
  controllers: [
    CreateAppointmentBookingController,
    GetAvailableSlotsController,
  ],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    DoctorAvailabilityGateway,
    AppointmentRepository,
    DoctorAvailability,
    { provide: APPOINTMENT_REPOSITORY, useClass: AppointmentRepository },
    {
      provide: DOCTOR_AVAILABILITY_GATEWAY,
      useClass: DoctorAvailabilityGateway,
    },
    {
      provide: DOCTOR_AVAILABILITY,
      useClass: DoctorAvailability,
    },
    {
      provide: NOTIFICATION_SERVICE,
      useClass: NotificationService,
    },
  ],
  exports: [DoctorAvailabilityGateway],
})
export class AppointmentBookingModule {}
