import { AppModule } from './app/app.module';
import { NestFactory } from '@nestjs/core';
import dns from 'node:dns';

dns.setServers(['1.1.1.1']);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('financas');

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`App rodando na porta ${port}`);
}

bootstrap();