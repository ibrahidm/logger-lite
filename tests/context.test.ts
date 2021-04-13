import { Logger } from "../src/logger";
import { Context } from "../src/context"

describe('class Context', () => {
    let logger: Logger, trace: string
    beforeEach(() => {
        logger = new Logger(4, 'contextTest', 'contextTestLogger')
        trace = 'contextTest'
    })

    it('has a `logger` property', () => {
        const context = new Context(logger, trace)
        expect(context.logger).toBe(logger)
    })

    it('has a `trace` property', () => {
        const context = new Context(logger, trace)
        expect(context.trace).toEqual(trace)
    })

    it('can have a `user` property', () => {
        const user = { fname: 'test', lname: 'test' }
        const context = new Context(logger, trace, user)
        expect(context.user).toBe(user)
    })
})