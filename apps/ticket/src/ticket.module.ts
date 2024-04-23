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
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: () => ({
          transport: Transport.TCP,
          options: {
            host: ServerConfig.AUTH_HOST,
            port: ServerConfig.TCP_PORT,
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
