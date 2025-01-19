import { Injectable } from '@nestjs/common';
import { Slot } from '../../domain/slot';
import { SlotEntity } from '../db/entities/SlotEntity';
import { SlotMapper } from './mappers/SlotMapper';

@Injectable()
export class DoctorAvailabilityRepository {
  private slots: SlotEntity[] = [];

  findAllSlots(): Promise<Slot[]> {
    return Promise.resolve(this.slots.map((slot) => SlotMapper.toDomain(slot)));
  }

  findAvailableSlots(): Promise<Slot[]> {
    const slots = this.slots.filter((slot) => !slot.isReserved);
    return Promise.resolve(slots.map((slot) => SlotMapper.toDomain(slot)));
  }

  findSlotById(id: string): Promise<Slot | undefined> {
    const slot = this.slots.find((slot) => slot.id === id);
    return Promise.resolve(slot ? SlotMapper.toDomain(slot) : undefined);
  }

  saveSlot(slot: Slot): void {
    this.slots.push(SlotMapper.toPersistence(slot));
  }

  updateSlot(updatedSlot: Slot): void {
    const index = this.slots.findIndex(
      (slot) => slot.id === updatedSlot.getDetails().id,
    );
    if (index !== -1) {
      this.slots[index] = SlotMapper.toPersistence(updatedSlot);
    }
  }

  findUpcomingReservations(): Promise<Slot[]> {
    const slots = this.slots.filter(
      (slot) => slot.isReserved && slot.time > new Date(),
    );
    return Promise.resolve(slots.map((slot) => SlotMapper.toDomain(slot)));
  }
}
