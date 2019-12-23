import dotenv from 'dotenv';
import Joi from '@hapi/joi';

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

export interface Environment {
  HTTP_HOST: string;
  HTTP_PORT: number;
  LOG_LEVEL: string;
}
const configSchema = Joi.object({
  HTTP_HOST: Joi.string().required(),
  HTTP_PORT: Joi.number().required(),
  LOG_LEVEL: Joi.string()
    .allow('debug', 'info', 'warn', 'error')
    .optional()
    .default('info')
});

const config = {
  HTTP_HOST: process.env.HTTP_HOST,
  HTTP_PORT: process.env.HTTP_PORT,
  LOG_LEVEL: process.env.LOG_LEVEL
};

const validation = configSchema.validate<Environment>(config as any);

if (validation.error) {
  // eslint-disable-next-line no-console
  console.error(validation.error);
  process.exit(1);
}

const { value: environment } = validation;

export { environment };
