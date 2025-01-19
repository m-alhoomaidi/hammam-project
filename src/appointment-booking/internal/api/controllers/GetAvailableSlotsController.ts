import { Controller, Get } from '@nestjs/common';
import { GetAvailableSlotsHandler } from '../../application/queries/get-available-slots/GetAvailableSlotsHandler';
import { GetAvailableSlotsResponse } from '../../application/queries/get-available-slots/GetAvailableSlotsResponse';

@Controller('api-v1')
export class GetAvailableSlotsController {
  constructor(
    private readonly getAvailableSlotsHandler: GetAvailableSlotsHandler,
  ) {}

  @Get('/available-slots')
  async getAvailableSlots(): Promise<GetAvailableSlotsResponse> {
    return this.getAvailableSlotsHandler.execute();
  }
}
