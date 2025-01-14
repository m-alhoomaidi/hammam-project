import { isGuid } from '../utils/guid';

export class Patient {
  private constructor(
    private readonly _id: string,
    private readonly _name: string,
  ) {}

  static of(id: string, name: string): Patient {
    if (!isGuid(id) || !name) {
      throw new Error('Invalid patient data');
    }

    return new Patient(id, name);
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }
}
