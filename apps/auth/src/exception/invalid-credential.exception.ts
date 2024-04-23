import { AbstractException, Code } from '@app/common';

export class InvalidCredentialException extends AbstractException {
  public readonly code: number;
  public readonly message: string;
  public readonly details: string | string[];
  public readonly stack?: string;

  constructor(details?: string | string[], message?: string) {
    super();

    this.code = Code.BAD_REQUEST.code;
    this.message = message || Code.BAD_REQUEST.message;
    this.details = details;
  }
}
