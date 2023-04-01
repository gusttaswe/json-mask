export class ApplicationError<T = string> extends Error {
  constructor(public code: T, message: string) {
    super(message);
  }
}