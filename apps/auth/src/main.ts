import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';

import { AuthModule } from './auth.module';
import { ServerConfig } from './config/server-config';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  app.useLogger(app.get(Logger));

  await app.listen(ServerConfig.PORT);
}
bootstrap();
