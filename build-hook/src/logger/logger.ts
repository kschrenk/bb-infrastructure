import winston from 'winston';
import config from 'config'

const transports = []
const {env: { NODE_ENV }} = process

if (process.env.NODE_ENV === 'production') {
  const combined = new winston.transports.File({ filename: `${config.get('logDir')}/combined.log` })
  const error = new winston.transports.File({ filename: `${config.get('logDir')}/error.log` , level: 'error'})
  transports.push(combined, error)
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

export default logger