import { z } from 'zod'

export const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']),
    DATABASE_URL: z.string().url(),
    APP_PORT: z.coerce.number(),
})