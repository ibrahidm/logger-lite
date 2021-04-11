"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    constructor(level, trace, name) {
        this.LOG_LEVELS = {
            OFF: 0,
            DEBUG: 1,
            INFO: 2,
            WARN: 3,
            ERROR: 4
        };
        this.name = name;
        this.level = level;
        this.trace = trace;
    }
    start(self, status) {
        this.info(self, status);
        this.time(`${self} = ${this.trace}`);
    }
    end(self, status) {
        this.info(`${self} invoked successfully`, status);
        this.timeEnd(`${self} - ${this.trace}`);
    }
    debug(message, status) {
        if (this.level < this.LOG_LEVELS.DEBUG)
            return;
        console.debug({
            message,
            trace: this.trace,
            status: status || 200,
            ts: Date.now(),
            type: this.debug.name
        });
    }
    info(message, status) {
        if (this.level < this.LOG_LEVELS.INFO)
            return;
        console.info({
            message,
            trace: this.trace,
            status: status || 200,
            ts: Date.now(),
            type: this.info.name
        });
    }
    warn(message, status) {
        if (this.level < this.LOG_LEVELS.WARN)
            return;
        console.warn({
            message,
            trace: this.trace,
            status: status || 200,
            ts: Date.now(),
            type: this.warn.name
        });
    }
    error(error, status, location) {
        if (this.level < this.LOG_LEVELS.ERROR)
            return;
        console.error({
            location,
            message: error.message,
            trace: this.trace,
            status: status || 500,
            ts: Date.now(),
            type: this.error.name
        });
    }
    time(label) {
        console.time(label);
    }
    timeEnd(label) {
        console.timeEnd(label);
    }
}
exports.Logger = Logger;
