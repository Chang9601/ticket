import { TicketDto } from '../dto/ticket.dto';
import { TicketEntity } from '../entity/ticket.entity';

export class TicketMapper {
  public static toEntity(ticketDto: TicketDto): TicketEntity {
    return new TicketEntity({ ...ticketDto });
  }

  public static toDto({
    id,
    title,
    price,
    userId,
    fileIds,
  }: TicketEntity): TicketDto {
    return new TicketDto(id, title, price, userId, fileIds);
  }
}
