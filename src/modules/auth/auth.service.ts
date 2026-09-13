import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service.js';
import { RegisterDto } from './dto/register.dto.js';
import * as argon2 from 'argon2';
import { User } from '../../generated/prisma/client.js';
import { LoginDto } from './dto/login.dto.js';
import { AuthResponse } from './types/authUser.type.js';
import { JwtService } from '@nestjs/jwt';
import config from '../../config/config.js';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwt: JwtService,
    ) {}

    async signUp(
        dto: RegisterDto,
    ): Promise<{ user: User; accessToken: string }> {
        const email = dto.email.trim().toLowerCase();
        
        const existing = await this.prisma.user.findUnique({
        where: { email },
        });

        if (existing) {
        throw new ConflictException('Email already registered');
        }
        
        const passwordHash = await argon2.hash(dto.password, {
        type: argon2.argon2id,
        });

        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                passwordHash,
            },
            select: {
                id: true,
                email: true,
                isActive: true,
                emailVerifiedAt: true,
                createdAt: true,
            },
        });

        return { user:user as User, accessToken: "token" };
    }

    async signIn(input: LoginDto): Promise<AuthResponse> {
        const email = input.email.trim().toLowerCase();

        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await argon2.verify(
            user.passwordHash,
            input.password,
        );

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        if (!user.isActive) {
            throw new UnauthorizedException('Account is inactive');
        }

        const accessToken = await this.jwt.signAsync({
        sub: user.id,
        email: user.email,
        });

        return {
            user: {
                id: user.id,
                email: user.email,
                isActive: user.isActive,
                emailVerifiedAt: user.emailVerifiedAt,
                createdAt: user.createdAt,
            },
            accessToken: accessToken,
        };
    }


    async verifyToken(token: string) {
        const payload = await this.jwt.verifyAsync(token, {
            secret: config().jwt.secret,
        });

        return {
            user: payload,
        };
    }

    async getCurrentUser(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                email: true,
                isActive: true,
                emailVerifiedAt: true,
                createdAt: true,
            },
        });

        if (!user) {    
            throw new NotFoundException('User not found');
        }

        return user;
    }
}
