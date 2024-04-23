import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AbstractRepository } from '@app/common';

import { TicketEntity } from './entity/ticket.entity';

@Injectable()
export class TicketRepository extends AbstractRepository<TicketEntity> {
  protected readonly logger = new Logger(TicketRepository.name);

  constructor(
    @InjectRepository(TicketEntity) tickketRepository: Repository<TicketEntity>,
  ) {
    super(tickketRepository);
  }
}
