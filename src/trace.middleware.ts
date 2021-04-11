import { Request, Response, NextFunction } from 'express'
import uid from 'uniqid'

export const traceMiddleware = (req: Request, _: Response, next: NextFunction) => {
    const correlation = req.headers['x-correlation-id']
    const trace = `${correlation}-${uid()}`
    req.headers['x-trace-id'] = trace
    next()
}