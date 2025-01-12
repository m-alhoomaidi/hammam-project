import { Injectable } from '@nestjs/common';
import { Slot } from '../domain/slot';

@Injectable()
export class DoctorAvailabilityRepository {
  private slots: Slot[] = [];

  findAvailableSlots(): Slot[] {
    return this.slots.filter((slot) => !slot.isSlotReserved());
  }

  findSlotById(id: number): Slot | undefined {
    return this.slots.find((slot) => slot.getDetails().id === id);
  }

  saveSlot(slot: Slot): void {
    this.slots.push(slot);
  }

  updateSlot(updatedSlot: Slot): void {
    const index = this.slots.findIndex(
      (slot) => slot.getDetails().id === updatedSlot.getDetails().id,
    );
    if (index !== -1) {
      this.slots[index] = updatedSlot;
    }
  }
}
