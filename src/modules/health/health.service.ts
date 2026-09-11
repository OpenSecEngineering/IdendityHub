import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../database/prisma.service.js';

@Injectable()
export class HealthService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async check() {
    const database = await this.checkDatabase();

    const isHealthy = database.status === 'up';

    return {
      status: isHealthy ? 'ok' : 'error',
      service: 'identity-hub',
      checks: {
        database,
      }
    };
  }

  private async checkDatabase() {
    const startedAt = performance.now();

    try {
      await this.prisma.$queryRaw`SELECT 1`;

      return {
        status: 'up' as const,
        responseTimeMs: Math.round(performance.now() - startedAt),
      };
    } catch {
      return {
        status: 'down' as const,
        responseTimeMs: Math.round(performance.now() - startedAt),
      };
    }
  }
}