import {
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';

import { ResponseInterceptor } from '../interceptor/response.interceptor.js';
import { HttpExceptionFilter } from '../filters/https-response.filters.js';

export function configureApp(app: INestApplication) {
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
  );

  return app;
}