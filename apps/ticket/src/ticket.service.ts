import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, map } from 'rxjs';

import { FILE_SERVICE, UserPayload } from '@app/common';

import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketDto } from './dto/ticket.dto';
import { TicketRepository } from './ticket.repository';
import { TicketNotFoundException } from './exception/ticket-not-found.exception';
import { TicketMapper } from './mapper/ticket-mapper';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { TicketEntity } from './entity/ticket.entity';

@Injectable()
export class TicketService {
  constructor(
    private readonly ticketRepository: TicketRepository,
    @Inject(FILE_SERVICE) private readonly fileService: ClientProxy,
  ) {}

  public async create(
    user: UserPayload,
    createTicketDto: CreateTicketDto,
    files: Array<Express.Multer.File>,
  ) {
    console.log('WTF?');

    const w = this.fileService.send('upload', files).pipe(
      map(async (res) => {
        console.log(res);
        const ticketEntity = new TicketEntity({
          ...TicketMapper.toEntity(createTicketDto),
          userId: user.id,
          fileIds: res,
        });

        const savedTicketEntity = await this.ticketRepository.create(
          ticketEntity,
        );

        return TicketMapper.toDto(savedTicketEntity);
      }),
    );
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
    user: UserPayload,
    updateTicketDto: UpdateTicketDto,
  ): Promise<TicketDto> {
    const updateTicketEntity = await this.ticketRepository.update(
      { id, userId: user.id },
      updateTicketDto,
    );

    return TicketMapper.toDto(updateTicketEntity);
  }
}
