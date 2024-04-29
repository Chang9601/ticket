import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as cookieParser from 'cookie-parser';

import {
  AUTH_SERVICE,
  AllExceptionFilter,
  DatabaseModule,
  FILE_SERVICE,
  LoggerModule,
} from '@app/common';

import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { TicketRepository } from './ticket.repository';
import { TicketEntity } from './entity/ticket.entity';
import { ServerConfig } from './config/server-config';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([TicketEntity]),
    LoggerModule,
    /*
     * 공통 모듈의 인증 가드의 의존성을 해결하기 위해 인증 서비스 주입 토큰을 제공한다.
     * 티켓 모듈에서 인증 서비스를 등록하고 주입 토큰을 제공한다.
     */
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: () => ({
          transport: Transport.TCP,
          options: {
            host: ServerConfig.AUTH_HOST,
            port: ServerConfig.AUTH_PORT,
          },
        }),
      },
      /* 파일 모듈과 통신을 해야하기 때문에 추가한다. */
      {
        name: FILE_SERVICE,
        useFactory: () => ({
          transport: Transport.TCP,
          options: {
            host: ServerConfig.FILE_HOST,
            port: ServerConfig.FILE_PORT,
          },
        }),
      },
    ]),
  ],
  controllers: [TicketController],
  providers: [
    TicketService,
    TicketRepository,
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
export class TicketModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}
