import { Injectable } from '@nestjs/common';
import { SlotRequestDto } from '../api/dtos/slot-request.dto';
import { SlotResponseDto } from '../api/dtos/slot-response.dto';
import { DoctorAvailabilityDomainService } from '../domain/doctor-availability-domain.service';

@Injectable()
export class DoctorAvailabilityService {
  constructor(
    private readonly domainService: DoctorAvailabilityDomainService,
  ) {}

  async getAvailableSlots(): Promise<SlotResponseDto[]> {
    return this.domainService.getAvailableSlots();
  }

  async addSlot(slotReq: SlotRequestDto): Promise<SlotResponseDto> {
    return this.domainService.addSlot(
      slotReq.time,
      slotReq.doctorId,
      slotReq.doctorName,
      slotReq.cost,
    );
  }
}
