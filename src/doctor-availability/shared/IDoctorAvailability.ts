import { Slot } from '../internal/domain/slot';
export const DOCTOR_AVAILABILITY = Symbol('Doctor_Availability');

export interface IDoctorAvailability {
  findAvailableSlots(): Promise<Slot[]>;
  findSlotById(slotId: string): Promise<Slot | undefined>;
  isAvailable(slotId: string): Promise<boolean>;
  findUpcomingReservations(): Promise<Slot[]>;
}
