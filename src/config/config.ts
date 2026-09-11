import { envSchema } from "./env.schema.js";
import dotenv from "dotenv";

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
    }
})