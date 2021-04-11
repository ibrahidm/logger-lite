import { Request, Response, NextFunction } from 'express';
declare type RequestWithContext = Request & {
    context: object;
};
export declare const loggerMiddleware: (req: RequestWithContext, res: Response, next: NextFunction) => void;
export {};
