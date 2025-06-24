import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  })) // Enable validation globally, allow validation pipes to strip properties that are not in the DTOs
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
