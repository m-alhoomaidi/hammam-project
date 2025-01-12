export class Slot {
  private constructor(
    private readonly id: number,
    private readonly time: Date,
    private readonly doctorId: number,
    private readonly doctorName: string,
    private isReserved: boolean,
    private readonly cost: number,
  ) {}

  public static createNewSlot(
    id: number,
    time: Date,
    doctorId: number,
    doctorName: string,
    cost: number,
  ): Slot {
    // TODO: add some validation logic here
    if (!time || !doctorId || !doctorName || cost <= 0) {
      throw new Error('Invalid slot details');
    }

    return new Slot(id, time, doctorId, doctorName, false, cost);
  }

  public getDetails() {
    return {
      id: this.id,
      time: this.time,
      doctorId: this.doctorId,
      doctorName: this.doctorName,
      isReserved: this.isReserved,
      cost: this.cost,
    };
  }

  public reserveSlot() {
    if (this.isReserved) {
      throw new Error('Slot is already reserved');
    }
    this.isReserved = true;
  }

  public releaseSlot() {
    if (!this.isReserved) {
      throw new Error('Slot is not reserved');
    }
    this.isReserved = false;
  }

  public isSlotReserved(): boolean {
    return this.isReserved;
  }
}
