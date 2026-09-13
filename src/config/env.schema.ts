import { z } from 'zod'

export const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']),
    DATABASE_URL: z.string().url(),
    APP_PORT: z.coerce.number(),
    JWT_SECRET: z.string(),
    JWT_ACCESS_TOKEN_EXPIRES_IN: z.string().regex(
        /^\d+(s|m|h|d)$/,
        'Invalid JWT expiration format',
    ),
})