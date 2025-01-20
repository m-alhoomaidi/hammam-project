export class Patient {
  private constructor(
    private readonly _id: string,
    private readonly _name: string,
  ) {}

  static of(id: string, name: string): Patient {
    if (!name) {
      throw Error('data must have a name');
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
