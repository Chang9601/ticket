import { Module } from '@nestjs/common';

import { DatabaseModule } from '@app/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';
import { UserRepository } from './user.repository';

@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
