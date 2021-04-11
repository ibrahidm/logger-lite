import { Logger } from "./logger";
export const loggerMiddleware = (req, res, next) => {
    const trace = req.headers['x-trace-id'];
    const level = parseInt(process.env.LOG_LEVEL, 10);
    const logger = new Logger(level, trace);
    const context = {
        trace,
        logger,
    };
    req.context = context;
    console.log(`IP: ${req.ip}, HOST: ${req.hostname}, METHOD: ${req.method}`);
    const cleanup = () => {
        res.removeListener("finish", logFn);
        res.removeListener("close", abortFn);
        res.removeListener("error", errorFn);
        return;
    };
    const logFn = () => {
        cleanup();
        console.info(`${trace}`);
    };
    const abortFn = () => {
        cleanup();
        console.warn("Request aborted by the client");
    };
    const errorFn = (err) => {
        cleanup();
        console.error(`Request error: ${err}`);
    };
    res.on('finish', logFn);
    res.on('close', abortFn);
    res.on('error', errorFn);
    next();
};
