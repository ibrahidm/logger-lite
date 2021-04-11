import uid from 'uniqid';
export const traceMiddleware = (req, _, next) => {
    const correlation = req.headers['x-correlation-id'];
    const trace = `${correlation}-${uid()}`;
    req.headers['x-trace-id'] = trace;
    next();
};
