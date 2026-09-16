import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from './common/interceptor/response.interceptor.js';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/https-response.filters.js';
import config from './config/config.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(
    new ResponseInterceptor(),
  );
  
  app.useGlobalFilters(
    new HttpExceptionFilter(),
  )
  

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
