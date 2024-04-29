import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AllExceptionFilter, DatabaseModule, LoggerModule } from '@app/common';

import { FileController } from './file.controller';
import { FileService } from './file.service';
import { FileRepository } from './file.repository';
import { FileEntity } from './entity/file.entity';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([FileEntity]),
    LoggerModule,
  ],
  controllers: [FileController],
  providers: [
    FileService,
    FileRepository,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class FileModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}
