import { ApiProperty } from '@nestjs/swagger';

export class PublicUserDto {
  @ApiProperty({
    example: '5f50e840-30bf-4d24-8101-4b8a86339d24',
    description: 'Unique identifier of the user',
  })
  id: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address',
  })
  email: string;

  @ApiProperty({
    example: true,
    description: 'Whether the user account is active',
  })
  isActive: boolean;

  @ApiProperty({
    example: null,
    nullable: true,
    description: 'Date when the email was verified',
  })
  emailVerifiedAt: Date | null;

  @ApiProperty({
    example: '2026-09-13T06:00:26.935Z',
    description: 'User creation date',
  })
  createdAt: Date;
}