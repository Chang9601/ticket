import { Injectable } from '@nestjs/common';

import { UserPayload } from '@app/common';

import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketDto } from './dto/ticket.dto';
import { TicketRepository } from './ticket.repository';
import { TicketNotFoundException } from './exception/ticket-not-found.exception';
import { TicketMapper } from './mapper/ticket-mapper';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { TicketEntity } from './entity/ticket.entity';

@Injectable()
export class TicketService {
  constructor(private readonly ticketRepository: TicketRepository) {}

  public async create(
    user: UserPayload,
    createTicketDto: CreateTicketDto,
  ): Promise<TicketDto> {
    const ticketEntity = new TicketEntity({ ...createTicketDto });

    const savedTicketEntity = await this.ticketRepository.create({
      ...ticketEntity,
      userId: user.id,
    });

    return TicketMapper.toDto(savedTicketEntity);
  }

  public async findOne(id: number): Promise<TicketDto> {
    const ticketEntityExists = await this.ticketRepository.exist({
      id,
    });

    if (!ticketEntityExists) {
      throw new TicketNotFoundException('티켓이 존재하지 않습니다');
    }

    const ticketEntity = await this.ticketRepository.findOne({ id });

    return TicketMapper.toDto(ticketEntity);
  }

  public async findAll(): Promise<TicketDto[]> {
    const ticketEntities = await this.ticketRepository.findAll({});
    const ticketDtos = ticketEntities.map((ticketEntity) =>
      TicketMapper.toDto(ticketEntity),
    );

    return ticketDtos;
  }

  public async update(
    id: number,
    updateTicketDto: UpdateTicketDto,
  ): Promise<TicketDto> {
    const updateTicketEntity = await this.ticketRepository.update(
      { id },
      updateTicketDto,
    );

    return TicketMapper.toDto(updateTicketEntity);
  }
}
