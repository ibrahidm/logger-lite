import { Request, Response, NextFunction } from 'express'
import { Context } from './context';
import { Logger } from "./logger";


export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const trace = req.headers['x-trace-id']
    const level = parseInt(process.env.LOG_LEVEL as string, 10) || 4
    const logger = new Logger(level, trace as string)
    const context = new Context(logger, trace as string)

    req.context = context;

    console.log(`IP: ${req.ip}, HOST: ${req.hostname}, METHOD: ${req.method}`)

    const cleanup = () => {
        res.removeListener("finish", logFn);
        res.removeListener("close", abortFn);
        res.removeListener("error", errorFn);
        return;
      };
    
      const logFn = (): void => {
        cleanup();
        console.info(`${trace}`);
      };
    
      const abortFn = (): void => {
        cleanup();
        console.warn("Request aborted by the client");
      };

      const errorFn = (err: Error): void => {
        cleanup();
        console.error(`Request error: ${err}`);
      };

    res.on('finish', logFn)
    res.on('close', abortFn)
    res.on('error', errorFn)

    next();
}