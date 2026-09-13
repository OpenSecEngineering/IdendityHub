import { Test, TestingModule } from '@nestjs/testing';
import { Jwt } from './jwt.js';

describe('Jwt', () => {
  let provider: Jwt;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Jwt],
    }).compile();

    provider = module.get<Jwt>(Jwt);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
