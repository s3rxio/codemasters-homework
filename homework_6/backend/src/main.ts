import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { Logger, ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true
    })
  );

  await app.listen(3000);
  Logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
