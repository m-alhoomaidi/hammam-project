import { Module } from '@nestjs/common';
import { AppointmentService } from './application/appointment.service';
import { AppointmentController } from './infrastructure/api/appointment.controller';
import { InMemoryAppointmentRepository } from './infrastructure/persistence/in-memory-appointment.repository';
import { AppointmentRepositoryPort } from './domain/ports/appointment-repository.port';
import { DoctorAvailabilityModule } from '../doctor-availability/doctor-availability.module';
import { DoctorAvailabilityGateway } from './infrastructure/gateways/doctor-availability.gateway';
import { DoctorAvailabilityPort } from './domain/ports/doctor-availability.port';

@Module({
  imports: [DoctorAvailabilityModule],
  controllers: [AppointmentController],
  providers: [
    AppointmentService,
    {
      provide: AppointmentRepositoryPort,
      useClass: InMemoryAppointmentRepository,
    },
    {
      provide: DoctorAvailabilityPort,
      useClass: DoctorAvailabilityGateway,
    },
  ],
})
export class DoctorAppointmentManagementModule {}
