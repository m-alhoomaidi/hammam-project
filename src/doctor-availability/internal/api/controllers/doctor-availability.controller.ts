import { Body, Controller, Get, Post } from '@nestjs/common';
import { DoctorAvailabilityService } from '../../application/doctor-availability.service';
import { SlotRequestDto } from '../dtos/slot-request.dto';
import { SlotResponseDto } from '../dtos/slot-response.dto';

@Controller('api-v1/slots')
export class DoctorAvailabilityController {
  constructor(private readonly service: DoctorAvailabilityService) {}

  @Post('/')
  addSlot(
    @Body()
    createSlotDto: SlotRequestDto,
  ) {
    return this.service.addSlot(createSlotDto);
  }

  @Get('/')
  getAvailableSlots(): Promise<SlotResponseDto[]> {
    return this.service.findAllSlots();
  }
}
