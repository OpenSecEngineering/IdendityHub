import { ApiProperty } from '@nestjs/swagger';

import { ApiMetaDto } from './api-meta.dto.js';

export class ApiSuccessResponseDto<T> {
  @ApiProperty({
    example: true,
  })
  success: true;

  @ApiProperty()
  data: T;

  @ApiProperty({
    type: () => ApiMetaDto,
  })
  meta: ApiMetaDto;
}