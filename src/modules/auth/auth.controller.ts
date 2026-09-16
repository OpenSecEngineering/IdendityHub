import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { ApiBadRequestResponse, ApiBearerAuth, ApiConflictResponse, ApiCreatedResponse, ApiExtraModels, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse, getSchemaPath } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-add.guards.js';
import * as authentificatedUserTypes from '../../common/types/authentificated-user.types.js';
import { CurrentUser } from '../../common/decorators/current-user.decorators.js';
import { PublicUserDto } from './dto/public-user.dto.js';
import { ApiMetaDto } from '../../common/dto/api-meta.dto.js';
import { ApiSuccessResponseDto } from '../../common/dto/api-success-response.dto.js';

@ApiTags('Authentication')
@ApiExtraModels(
  PublicUserDto,
  ApiMetaDto,
  ApiSuccessResponseDto,
)
@Controller('auth')
export class AuthController {
    constructor(private readonly authservice: AuthService){}

    @Post('register')
    @ApiOperation({
        summary: 'Register a new user',
    })
    @ApiCreatedResponse({
        description: 'User successfully registered',
    })
    @ApiBadRequestResponse({
        description: 'Invalid request data',
    })
    @ApiConflictResponse({
        description: 'Email already registered',
    })
    async register(@Body() dto: RegisterDto) {
        return this.authservice.signUp(dto);
    }


    @Post('login')
    @ApiOperation({
        summary: 'Authenticate a user',
    })
    @ApiCreatedResponse({
        description: 'User successfully authenticated',
    })
    @ApiBadRequestResponse({
        description: 'Invalid request data',
    })
    @ApiUnauthorizedResponse({
        description: 'Invalid credentials or inactive account',
    })
    async login(@Body() dto: LoginDto) {
        return this.authservice.signIn(dto);
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({
        summary: 'Get the current authenticated user',
    })
    @ApiOkResponse({
        description: 'Authenticated user successfully retrieved',
        schema: {
            allOf: [
            {
                $ref: getSchemaPath(ApiSuccessResponseDto),
            },
            {
                properties: {
                data: {
                    $ref: getSchemaPath(PublicUserDto),
                },
                },
            },
            ],
        },
    })
    @ApiUnauthorizedResponse({
        description: 'Missing or invalid access token',
    })
    @ApiNotFoundResponse({
        description: 'User not found',
    })
    getMe(
        @CurrentUser()
        user: authentificatedUserTypes.AuthenticatedUser,
    ) {
        return this.authservice.getCurrentUser(user.userId);
    }
}
