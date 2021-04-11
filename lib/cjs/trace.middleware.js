"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.traceMiddleware = void 0;
const uniqid_1 = __importDefault(require("uniqid"));
const traceMiddleware = (req, _, next) => {
    const correlation = req.headers['x-correlation-id'];
    const trace = `${correlation}-${uniqid_1.default()}`;
    req.headers['x-trace-id'] = trace;
    next();
};
exports.traceMiddleware = traceMiddleware;
