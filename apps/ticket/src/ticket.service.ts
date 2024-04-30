import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { FILE_SERVICE, UserPayload } from '@app/common';

import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketDto } from './dto/ticket.dto';
import { TicketRepository } from './ticket.repository';
import { TicketNotFoundException } from './exception/ticket-not-found.exception';
import { TicketMapper } from './mapper/ticket-mapper';
import { UpdateTicketDto } from './dto/update-ticket.dto';

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
    /*
     * send()는 Cold Observables이므로 나중에 구독할 응답을 반환하거나
     * Observable을 시작하려면 subscribe()를 직접 사용하거나
     * lastValueFrom()을 사용하여 Observable을 프로미스로 변환하여 응답을 기다릴 수 있다.
     */
    const response$ = this.fileService.send<Promise<number[]>>('upload', {
      files,
    });

    const fileIds = await lastValueFrom(response$);

    const ticketEntity = await this.ticketRepository.create({
      ...TicketMapper.toEntity(createTicketDto),
      userId: user.id,
      fileIds,
    });

    return TicketMapper.toDto(ticketEntity);
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
