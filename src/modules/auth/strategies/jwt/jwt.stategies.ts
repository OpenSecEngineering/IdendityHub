import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import config from '../../../../config/config.js';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config().jwt.secret,
        });
    }

    async validate(payload: {
        sub: string;
        email: string;
    }) {
        return {
            userId: payload.sub,
            email: payload.email,
        };
    }
}
