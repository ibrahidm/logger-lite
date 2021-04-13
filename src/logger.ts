export class Logger {
    name?: string
    level: number
    trace: string 

    private LOG_LEVELS = {
        OFF: 0, 
        DEBUG: 1, 
        INFO: 2, 
        WARN: 3, 
        ERROR: 4
    }

    constructor(level: number, trace: string, name?: string) {
        this.name = name
        this.level = level 
        this.trace = trace
    }

    start(self: string, status?: number): void {
        this.info(self, status)
        this.time(`${self} = ${this.trace}`)
    }

    end(self: string, status?: number): void {
        this.info(`${self} invoked successfully`, status)
        this.timeEnd(`${self} - ${this.trace}`)
    }

    debug(message: string, status?: number): void {
        if (this.level < this.LOG_LEVELS.DEBUG) return
        console.debug({
            message,
            trace: this.trace,
            status: status || 200,
            ts: Date.now(),
            type: this.debug.name
        })
    }

    info(message: string, status?: number): void {
        if (this. level < this.LOG_LEVELS.INFO) return
        console.info({
            message,
            trace: this.trace,
            status: status || 200,
            ts: Date.now(),
            type: this.info.name
        })
    }

    warn(message: string, status?: number): void {
        if (this. level < this.LOG_LEVELS.WARN) return
        console.warn({
            message,
            trace: this.trace,
            status: status || 200,
            ts: Date.now(),
            type: this.warn.name
        })
    }

    error(error: Error, location: string, status?: number): void {
        if (this. level < this.LOG_LEVELS.ERROR) return
        console.error({
            location,
            message: error.message,
            trace: this.trace,
            status: status || 500,
            ts: Date.now(),
            type: this.error.name
        })
    }

    time(label: string): void {
        console.time(label)
    }

    timeEnd(label: string): void {
        console.timeEnd(label)
    }
}