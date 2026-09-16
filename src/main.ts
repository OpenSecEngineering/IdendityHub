import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import config from './config/config.js';
import { configureApp } from './common/boostrap/configure-app.boostrap.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  configureApp(app)

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Identity Hub API')
    .setDescription(
      'Identity and Access Management API for OpenSecEngineering',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();

  const swaggerDocument = SwaggerModule.createDocument(
    app,
    swaggerConfig, 
  );

  SwaggerModule.setup('docs', app, swaggerDocument);
  await app.listen(config().app.port);
}
await bootstrap();
