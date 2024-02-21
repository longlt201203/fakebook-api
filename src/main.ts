import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Env } from '@utils';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from "cors";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cors({ origin: '*' }));

  const config = new DocumentBuilder()
    .setTitle('Fakebook')
    .setDescription('The FakeBook API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(Env.LISTEN_PORT);
}
bootstrap();
