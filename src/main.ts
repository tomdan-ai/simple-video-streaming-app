import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { createServer } from 'http';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Use the IoAdapter to integrate Socket.IO with NestJS
  app.useWebSocketAdapter(new IoAdapter(createServer(app.getHttpServer())));

  await app.listen(3000);
}

bootstrap();
