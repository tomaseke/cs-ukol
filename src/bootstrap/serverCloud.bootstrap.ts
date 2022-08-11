import {ServerBaseBootstrap} from './serverBase.bootstrap';
import {logger} from '../logger/tslogger';

const cluster = require('cluster');

export class ServerCloudBootstrap extends ServerBaseBootstrap{

    constructor() {
        super();
    }

    async start() {
        if (this.workers === 1) {
            logger.info(`Setting up 1 worker.`)
        }
        else if (cluster.isMaster) {
            logger.info(`Master cluster setting up ${this.workers} workers.`);
            for (let i = 1; i < this.workers; i++) {
                cluster.fork();
            }
            cluster.on('online', function (worker) {
                logger.info(`Worker ${worker.process.pid} is online`);
            });

            cluster.on('exit', function (worker, code, signal) {
                logger.info(`Worker ${worker.process.pid} died with code: ${code} and signal: ${signal}`);
                logger.info('Starting a new worker');
                cluster.fork();
            });
        }
        const app = this.initServer();

        return {
            app: app
        }

    }
}
