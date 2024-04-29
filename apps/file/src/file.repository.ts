import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AbstractRepository } from '@app/common';

import { FileEntity } from './entity/file.entity';

@Injectable()
export class FileRepository extends AbstractRepository<FileEntity> {
  protected readonly logger = new Logger(FileRepository.name);

  constructor(
    @InjectRepository(FileEntity) fileRepository: Repository<FileEntity>,
  ) {
    super(fileRepository);
  }
}
