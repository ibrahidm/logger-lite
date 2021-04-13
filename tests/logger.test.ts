import uid from 'uniqid'
import { Logger } from '../src/logger'

describe('Logger', () => {
    const name = 'testLogInstance'
    const level = 4
    const trace = uid()
    let logger = new Logger(level, trace, name)

    it('has a name', () => { expect(logger.name).toEqual(name) })
    it('has a level', () => { expect(logger.level).toEqual(level) })
    it('has a trace', () => { expect(logger.trace).toEqual(trace) })

    let message:string, status:number

    beforeEach(() => {
        message = 'test'
        status = 200,
        logger.level = 4
    })

    describe('debug()', () => {

        let debugMock: jest.Mock

        beforeEach(() => {
            debugMock = jest.fn()
            global.console.debug = debugMock;
        })

        describe('and the `LOG_LEVEL` is >= 1', () => {
            it('logs debugs to console while taking params `message` and `status`', () => {
                logger.debug(message, status)
                expect(debugMock).toHaveBeenCalled()
            })
        })

        describe('and the `LOG_LEVEL` is == 0', () => {
            it('does not debug to console', () => {
                logger.level = 0
                logger.debug(message, status)
                expect(debugMock).not.toHaveBeenCalled()
            })
        })
    })

    describe('info()', () => {
        let infoMock: jest.Mock
        beforeEach(() => {
            infoMock = jest.fn()
            global.console.info = infoMock;
        })

        describe('and the `LOG_LEVEL` is >= 2', () => {
            it('logs info to console while taking params `message` and `status', () => {
                logger.info(message, status)
                expect(infoMock).toHaveBeenCalled()
            })
        })
        
        describe('and the `LOG_LEVEL` is < 2', () => {
            it('does not info to console', () => {
                logger.level = 1
                expect(infoMock).not.toHaveBeenCalled()
            })
        })
    })

    describe('warn()', () => {
        let warnMock: jest.Mock
        beforeEach(() => {
            warnMock = jest.fn()
            global.console.warn = warnMock;
        })

        describe('and the `LOG_LEVEL` is >= 3', () => {
            it('logs warn to console while taking params `message` and `status', () => {
                logger.warn(message, status)
                expect(warnMock).toHaveBeenCalled()
            })
        })
        
        describe('and the `LOG_LEVEL` is < 3', () => {
            it('does not warn to console', () => {
                logger.level = 2
                expect(warnMock).not.toHaveBeenCalled()
            })
        })
    })

    describe('error()', () => {
        let errorMock: jest.Mock
        beforeEach(() => {
            errorMock = jest.fn()
            global.console.error = errorMock;
        })

        describe('and the `LOG_LEVEL` is >= 4', () => {
            const error = new Error('This is an error message')
            const status = 800
            it('logs error to console', () => {
                logger.error(error, name, status)
                expect(errorMock).toHaveBeenCalled()
            })
        })
        
        describe('and the `LOG_LEVEL` is < 4', () => {
            it('does not error to console', () => {
                logger.level = 3
                expect(errorMock).not.toHaveBeenCalled()
            })
        })
    })

    describe('start()', () => {
        let mockInfoFn: jest.Mock, mockTimeFn: jest.Mock
        beforeEach(() => {
            mockInfoFn = jest.fn()
            mockTimeFn = jest.fn()
            global.console.info = mockInfoFn
            logger.time = mockTimeFn
            logger.start('describe start')
        })

        it('calls `logger.info`', () => {
            expect(mockInfoFn).toHaveBeenCalled()
        })

        it('calls `logger.time`', () => {
            expect(mockTimeFn).toHaveBeenCalled()
        })
    })

    describe('timeEnd()', () => {
        let mockConsoleTimeEnd: jest.Mock
        beforeEach(() => {
            mockConsoleTimeEnd = jest.fn()
            global.console.timeEnd = mockConsoleTimeEnd
            logger.timeEnd('label')
        })

        it('calls `console.timeEnd`', () => {
            expect(mockConsoleTimeEnd).toHaveBeenCalled()
        })
    })
})