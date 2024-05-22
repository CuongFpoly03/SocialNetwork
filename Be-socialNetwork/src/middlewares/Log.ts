import express from  'express';
import morgan from 'morgan';



class Log {
    private log: string;
    constructor(log: string) {
        this.log = log;
    }

    private addLogs(log: string) {
        this.log = log;
        return `Logs: ${this.log}\n`;
    }

    public showLogs(log: string) {
        express().use(morgan("short"));
        console.log(this.addLogs(log));
    }
}

export default new (Log as any)();