import { HttpException, HttpStatus } from '@nestjs/common';

export class Patient {
  private constructor(
    private readonly _id: string,
    private readonly _name: string,
  ) {}

  static of(id: string, name: string): Patient {
    if (!name) {
      throw new HttpException('Invalid patient data', HttpStatus.BAD_REQUEST);
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
