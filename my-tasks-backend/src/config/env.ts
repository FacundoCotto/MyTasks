import dotenv from 'dotenv';
import { z } from 'zod';
import { AppError } from '../core/utils/AppError';

const envFile = process.env.NODE_ENV === 'development' ? '.env.dev' : '.env';

dotenv.config({
  debug: process.env.NODE_ENV === 'development',
  path: envFile,
});

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'staging']).default('development'),
    PORT: z.coerce.number().int().min(1024).max(65535).default(5000),
    DOMAIN: z.string().default('localhost'),
    MONGO_URI: z.url('MONGO_URI must be a valid URL'),
    JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
    JWT_EXPIRES_IN: z.string().min(2).default('15m'),
    JWT_REFRESH_SECRET: z.string().min(32, 'JWT_REFRESH_SECRET must be at least 32 characters'),
    JWT_REFRESH_EXPIRES_IN: z.string().min(2).default('7d'),
    TWO_FA_EXPIRATION_MINUTES: z.string().min(2).default('15m'),
    EMAIL_JS_SERVICE_ID: z.string().min(2).default('service_id'),
    EMAIL_JS_WELCOME_TEMPLATE_ID: z.string().min(2).default('template_id'),
    EMAIL_JS_LOGIN_TEMPLATE_ID: z.string().min(2).default('template_id'),
    EMAIL_JS_PUBLIC_KEY: z.string().min(2).default('public_key'),
    EMAIL_JS_PRIVATE_KEY: z.string().min(2).default('private_key'),
    EMAIL_JS_URL: z.url('EMAIL_JS_URL must be a valid URL'),
});

const parsedEnv = envSchema.safeParse(process.env)

if(!parsedEnv.success){
  console.error('Invalid environment variables:', parsedEnv.error.flatten().fieldErrors)
  throw new AppError("Invalid environment variables. Check your .env file", 500)
}

export const env = Object.freeze(parsedEnv.data)