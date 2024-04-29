import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateTicketDto {
  @IsOptional()
  public id: number;

  @IsString()
  public title: string;

  @Min(0)
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @Type(() => Number)
  public price: number;

  @IsOptional()
  public userId: number;

  @IsOptional()
  public fileIds: number[];

  constructor(title: string, price: number) {
    this.title = title;
    this.price = price;
  }
}
