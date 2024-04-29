import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';

import { FileModule } from './file.module';
import { ServerConfig } from './config/server-config';

async function bootstrap() {
  const app = await NestFactory.create(FileModule);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: ServerConfig.PORT,
    },
  });

  app.useLogger(app.get(Logger));

  await app.startAllMicroservices();
}
bootstrap();
