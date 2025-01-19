export interface SlotsResponse {
  id: string;
  time: Date;
  doctorId: string;
  doctorName: string;
  isReserved: boolean;
  cost: number;
}

export class GetAvailableSlotsResponse {
  slots: SlotsResponse[];
}
