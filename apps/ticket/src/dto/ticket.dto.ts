export class TicketDto {
  public id: number;

  public title: string;

  public price: number;

  public userId: number;

  public fileIds: number[];

  constructor(
    id?: number,
    title?: string,
    price?: number,
    userId?: number,
    fileIds?: number[],
  ) {
    this.id = id || -1;
    this.title = title || '';
    this.price = price || -1;
    this.userId = userId || -1;
    this.fileIds = fileIds || [];
  }
}
