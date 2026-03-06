import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';

async function bootstrap() {
  const PORT = 3000;
  const app = await NestFactory.create(AppModule);
  

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,//strips properties that do not have any decorators
      forbidNonWhitelisted: true,
      transform: true, //automatically transform payloads to be objects typed according to their DTO classes
      disableErrorMessages: false, //disable error messages in production
    }),
  )

  await app.listen(PORT);
  console.log(`Server is running on port ${PORT}`);
}
bootstrap();
