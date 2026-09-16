import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '../src/app.module.js';
import { configureApp } from '../src/common/boostrap/configure-app.boostrap.js';

describe('Auth (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

    app = moduleFixture.createNestApplication();

    configureApp(app)
      
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should register, login and get current user', async () => {
    const email = `test-${Date.now()}@example.com`;
    const password = 'StrongPassword123!';

    // Register
    const registerResponse = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email,
        password,
      })
      .expect(201);

    expect(registerResponse.body.success).toBe(true);

    // Login
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email,
        password,
      })
      .expect(201);

    expect(loginResponse.body.success).toBe(true);

    const accessToken = loginResponse.body.data.accessToken;

    expect(accessToken).toBeDefined();

    // Get current user
    const meResponse = await request(app.getHttpServer())
      .get('/auth/me')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(meResponse.body.success).toBe(true);
    expect(meResponse.body.data.email).toBe(email);
    expect(meResponse.body.data.isActive).toBe(true);

    expect(meResponse.body.data.passwordHash).toBeUndefined();
  });
});