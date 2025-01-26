export const DOCTOR_AVAILABILITY_PORT = 'DOCTOR_AVAILABILITY_PORT';

export abstract class DoctorAvailabilityPort {
  abstract findSlotById(slotId: string): Promise<{
    id: string;
    time: Date;
    doctorId: string;
    isReserved: boolean;
    cost: number;
  } | null>;
}
