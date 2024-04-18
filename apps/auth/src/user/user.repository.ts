import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AbstractRepository } from '@app/common';

import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserRepository extends AbstractRepository<UserEntity> {
  protected readonly logger = new Logger(UserRepository.name);

  constructor(
    @InjectRepository(UserEntity) userRepository: Repository<UserEntity>,
  ) {
    super(userRepository);
  }
}
