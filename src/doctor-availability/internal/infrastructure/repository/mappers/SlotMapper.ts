import { Slot } from 'src/doctor-availability/internal/domain/slot';
import { SlotEntity } from '../../db/entities/SlotEntity';

export class SlotMapper {
  static toDomain(slot: SlotEntity): Slot {
    return Slot.createSlotFromDb(
      slot.id,
      slot.time,
      slot.doctorId,
      slot.doctorName,
      slot.isReserved,
      slot.cost,
    );
  }

  static toPersistence(domain: Slot): SlotEntity {
    const slot = domain.getDetails();
    return {
      id: slot.id,
      time: slot.time,
      doctorId: slot.doctorId,
      doctorName: slot.doctorName,
      cost: slot.cost,
      isReserved: slot.isReserved,
    };
  }
}
