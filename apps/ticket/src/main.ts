import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';

import { TicketModule } from './ticket.module';
import { ServerConfig } from './config/server-config';

async function bootstrap() {
  const app = await NestFactory.create(TicketModule);

  app.useLogger(app.get(Logger));

  await app.listen(ServerConfig.PORT);
}
bootstrap();
