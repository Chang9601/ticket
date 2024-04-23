import { IsNumber, IsString, Min } from 'class-validator';

export class UpdateTicketDto {
  @IsString()
  public title: string;

  @Min(0)
  @IsNumber({ allowInfinity: false, allowNaN: false })
  public price: number;

  constructor(title: string, price: number) {
    this.title = title;
    this.price = price;
  }
}
