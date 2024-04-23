import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';

import { AuthModule } from './auth.module';
import { ServerConfig } from './config/server-config';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  /*
    NestJS의 마이크로서비스는 기본적으로 HTTP와 다른 전송 계층을 사용하는 애플리케이션이다.
    NestJS는 여러 내장 전송 계층 구현을 지원한다. 이를 트랜스포터(transporter)라고 하며 서로 다른 마이크로서비스 인스턴스 간에 메시지를 전송하는 역할을 한다. 
    대부분의 트랜스포터는 기본적으로 요청-응답 및 이벤트 기반 메시지 스타일을 모두 지원한다.
    기본적으로 마이크로서비스는 TCP 전송 계층을 사용한다.
  */
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      // IP 주소는 0.0.0.0 호스트의 모든 인터페이스에 바인딩하도록 마이크로서비스에게 말한다.
      host: '0.0.0.0',
      port: ServerConfig.TCP_PORT,
    },
  });

  app.useLogger(app.get(Logger));

  // TCP 전송 계층을 통해 마이크로서비스를 시작하고 들어오는 이벤트와 요청을 수신 대기한다.
  await app.startAllMicroservices();
  await app.listen(ServerConfig.HTTP_PORT);
}
bootstrap();
