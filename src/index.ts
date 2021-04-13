import { Context } from 'node:vm'
import { Logger } from './logger'
import { loggerMiddleware } from './logger.middleware'
import { traceMiddleware } from './trace.middleware'

declare global {
    namespace Express {
      interface Request {
        context: Context
      }
    }
  }

export {
    Logger,
    loggerMiddleware,
    traceMiddleware
}