import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { PrismaModule } from '../../database/prisma.module.js';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { JwtModule } from '@nestjs/jwt';
import config from '../../config/config.js';
import { JwtStrategy } from './strategies/jwt/jwt.stategies.js';


@Module({
    imports: [
        PrismaModule, 
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: config().jwt.secret,
            signOptions: {
                expiresIn: config().jwt.accessTokenExpiresIn,
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
