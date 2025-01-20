import { v4 as uuid, validate } from 'uuid';

export const guid = uuid;

export const isGuid = validate;
