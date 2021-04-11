export declare class Logger {
    name?: string;
    level: number;
    trace: string;
    private LOG_LEVELS;
    constructor(level: number, trace: string, name?: string);
    start(self: string, status: number): void;
    end(self: string, status: number): void;
    debug(message: string, status: number): void;
    info(message: string, status: number): void;
    warn(message: string, status: number): void;
    error(error: Error, status: number, location: string): void;
    time(label: string): void;
    timeEnd(label: string): void;
}
