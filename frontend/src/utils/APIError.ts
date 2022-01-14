export class APIError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    const trueProto = new.target.prototype;

    Object.setPrototypeOf(this, trueProto);
  }
}
