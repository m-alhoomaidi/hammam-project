import { Injectable } from '@nestjs/common';
import { SlotRequestDto } from '../api/dtos/slot-request.dto';
import { SlotResponseDto } from '../api/dtos/slot-response.dto';
import { DoctorAvailabilityDomainService } from '../domain/doctor-availability-domain.service';

@Injectable()
export class DoctorAvailabilityService {
  constructor(
    private readonly domainService: DoctorAvailabilityDomainService,
  ) {}

  async findAllSlots(): Promise<SlotResponseDto[]> {
    const slots = await this.domainService.getAllSlots();
    return slots.map((slot) => ({
      ...slot,
    }));
  }

  async getAvailableSlots(): Promise<SlotResponseDto[]> {
    const slots = await this.domainService.getAvailableSlots();
    return slots.map((slot) => ({
      ...slot,
    }));
  }

  async addSlot(slotReq: SlotRequestDto): Promise<SlotResponseDto> {
    const slot = await this.domainService.addSlot(
      slotReq.time,
      slotReq.doctorId,
      slotReq.doctorName,
      slotReq.cost,
    );
    return {
      ...slot,
      id: slot.id,
    };
  }
}
