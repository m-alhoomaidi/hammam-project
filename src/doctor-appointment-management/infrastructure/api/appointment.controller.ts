import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppointmentService } from '../../application/appointment.service';
import { Appointment } from '../../domain/models/appointment';

@Controller('doctor-appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get()
  async getUpcomingAppointments(
    @Query('doctorId') doctorId: string,
  ): Promise<Appointment[]> {
    return this.appointmentService.getUpcomingAppointments(doctorId);
  }

  @Post(':id/complete')
  async completeAppointment(@Param('id') id: string): Promise<void> {
    await this.appointmentService.completeAppointment(id);
  }

  @Post(':id/cancel')
  async cancelAppointment(@Param('id') id: string): Promise<void> {
    await this.appointmentService.cancelAppointment(id);
  }
}
