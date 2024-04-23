import { AbstractException, Code } from '@app/common';

export class TicketNotFoundException extends AbstractException {
  public readonly code: number;
  public readonly message: string;
  public readonly details: string | string[];
  public readonly stack?: string;

  constructor(details?: string | string[], message?: string) {
    super();

    this.code = Code.NOT_FOUND.code;
    this.message = message || Code.NOT_FOUND.message;
    this.details = details;
  }
}
