export const DOCTOR_AVAILABILITY_GATEWAY = Symbol('IDoctorAvailabilityGateway');

export interface IDoctorAvailabilityGateway {
  getAllAvailableSlots(doctorId: string): Promise<any[]>;
  isSlotAvailable(slotId: string): Promise<boolean>;
}
