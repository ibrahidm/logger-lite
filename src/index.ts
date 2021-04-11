import { Logger } from './logger'
import { loggerMiddleware } from './logger.middleware'
import { traceMiddleware } from './trace.middleware'

declare global {
    namespace Express {
      interface Request {
        context: object
      }
    }
  }

export {
    Logger,
    loggerMiddleware,
    traceMiddleware
}