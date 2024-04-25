import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FileEntity } from './file.entity';
import { AbstractRepository } from '../repository';

Injectable();
export class FileRepository extends AbstractRepository<FileEntity> {
  protected readonly logger = new Logger(FileRepository.name);

  constructor(
    @InjectRepository(FileEntity) fileRepository: Repository<FileEntity>,
  ) {
    super(fileRepository);
  }
}
