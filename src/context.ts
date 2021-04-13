import { Logger } from "./logger"

export class Context {
    logger: Logger
    trace: string
    user?: object

    constructor(logger: Logger, trace: string, user?: object) {
        this.logger = logger
        this.trace = trace 
        this.user = user
    }
}