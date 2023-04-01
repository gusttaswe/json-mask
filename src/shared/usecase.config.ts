import { Result } from './result.config';

export abstract class UseCase<T, R, E> {
  public abstract execute(dto: T): Promise<Result<R, E>>;
}