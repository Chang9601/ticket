import { AbstractException, Code } from '@app/common';

export class DuplicateUserException extends AbstractException {
  public readonly code: number;
  public readonly message: string;
  public readonly details: string | string[];
  public readonly stack?: string;

  constructor(details?: string | string[], message?: string) {
    super();

    this.code = Code.CONFLICT.code;
    this.message = message || Code.CONFLICT.message;
    this.details = details;
  }
}
