import { envSchema } from "./env.schema.js";
import dotenv from "dotenv";
import type { StringValue } from "ms";

dotenv.config();

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
    console.error('Invalid environment variables:', parsedEnv.error.issues.map(issue => issue.message))
    throw new Error('Invalid environment variables')
}

const env = parsedEnv.data

export default () => ({
    app: {
        nodeEnv: env.NODE_ENV,
        port: env.APP_PORT
    },
    database: {
        url: env.DATABASE_URL,
    },
    jwt: {
        secret: env.JWT_SECRET,
        accessTokenExpiresIn: env.JWT_ACCESS_TOKEN_EXPIRES_IN as StringValue,
    },
})