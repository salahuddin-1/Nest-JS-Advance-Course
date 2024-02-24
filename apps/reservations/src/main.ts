import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);

  // Enable validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      // If from the client side, the client sends a field that is not in the DTO,
      // it will automatically strip it out
      whitelist: true,
    }),
  );

  // Enable Pinologger
  app.useLogger(app.get(Logger));
  await app.listen(3000);
}
bootstrap();
