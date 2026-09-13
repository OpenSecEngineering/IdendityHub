import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginDto {
    @ApiProperty({ example: 'user@example.com', description: 'User email address', })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'StrongPassword123!', description: 'User password', minLength: 12, maxLength: 128, })
    @IsString()
    @MinLength(12)
    @MaxLength(128)
    password: string;
}