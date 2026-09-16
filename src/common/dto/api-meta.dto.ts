import { ApiProperty } from '@nestjs/swagger';

export class ApiMetaDto {
  @ApiProperty({
    example: '2026-09-16T18:30:00.000Z',
  })
  timestamp: string;
}