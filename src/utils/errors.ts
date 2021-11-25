/* eslint-disable max-classes-per-file */
import { Err } from 'typed';

export class APIError extends Error {
  constructor(public status: number, message?: string) {
    super(message);

    Object.setPrototypeOf(this, APIError.prototype);
  }
}

export class ValidationAPIError extends Error {
  constructor(public errors: Err[], public status: number = 400) {
    super();

    Object.setPrototypeOf(this, ValidationAPIError.prototype);
  }
}
