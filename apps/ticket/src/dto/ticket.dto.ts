export class TicketDto {
  public title: string;

  public price: number;

  public userId: number;

  constructor(title?: string, price?: number, userId?: number) {
    this.title = title || '';
    this.price = price || 0;
    this.userId = userId || 0;
  }
}
